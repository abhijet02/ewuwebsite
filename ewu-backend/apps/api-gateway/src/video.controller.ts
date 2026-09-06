import {
  Controller,
  Get,
  Req,
  Res,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { join, resolve } from 'path';
import { createReadStream, statSync, existsSync } from 'fs';
import { Request, Response } from 'express';
import * as mime from 'mime-types';

@Controller('uploads')
export class VideoController {
  private logger = new Logger(VideoController.name);
  private readonly uploadsRoot = join(process.cwd(), 'uploads');

  @Get('*')
  async streamVideo(@Req() req: Request, @Res() res: Response) {
    try {
      // Log the original request for debugging
      this.logger.log(`Original request path: ${req.path}`);
      this.logger.log(`Original request URL: ${req.url}`);
      this.logger.log(`Uploads root: ${this.uploadsRoot}`);

      // Extract the path after /uploads/ more carefully
      let relativePath: string;
      
      // Method 1: Try to extract from req.path
      if (req.path.startsWith('/uploads/')) {
        relativePath = req.path.substring('/uploads/'.length);
      } 
      // Method 2: Try to extract from req.url (might work better with proxies)
      else if (req.url.startsWith('/uploads/')) {
        relativePath = req.url.substring('/uploads/'.length);
      } 
      // Method 3: Use regex as fallback
      else {
        const match = req.path.match(/^\/uploads\/(.*)/);
        relativePath = match ? match[1] : '';
      }

      // Remove any query parameters
      relativePath = relativePath.split('?')[0];

      this.logger.log(`Extracted relative path: ${relativePath}`);

      if (!relativePath) {
        throw new BadRequestException('Invalid file path');
      }

      // Decode URL-encoded characters and normalize path
      relativePath = decodeURIComponent(relativePath).replace(/\.\./g, ''); // Basic path traversal protection

      // Resolve absolute path in uploads folder
      const resolvedPath = resolve(this.uploadsRoot, relativePath);

      this.logger.log(`Resolved path: ${resolvedPath}`);

      // Security: Prevent accessing files outside uploads directory
      if (!resolvedPath.startsWith(this.uploadsRoot)) {
        this.logger.warn(`Path traversal attempt: ${resolvedPath}`);
        throw new BadRequestException('Access denied: invalid path');
      }

      if (!existsSync(resolvedPath)) {
        this.logger.warn(`File not found: ${resolvedPath}`);
        throw new NotFoundException('File not found');
      }

      const stat = statSync(resolvedPath);
      const fileSize = stat.size;
      const range = req.headers.range;

      const contentType = mime.lookup(resolvedPath) || 'application/octet-stream';

      if (range) {
        this.logger.log(`Range request: ${range}`);
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        
        // Validate range parameters
        if (isNaN(start) || isNaN(end) || start >= fileSize || end >= fileSize || start > end) {
          res.setHeader('Content-Range', `bytes */${fileSize}`);
          return res.status(416).end();
        }

        const chunkSize = end - start + 1;
        const file = createReadStream(resolvedPath, { start, end });

        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': contentType,
        };

        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
        };
        res.writeHead(200, head);
        createReadStream(resolvedPath).pipe(res);
      }
    } catch (error) {
      this.logger.error('Video streaming error:', error);
      
      // Only send response if headers haven't been sent yet
      if (!res.headersSent) {
        if (error instanceof NotFoundException || error instanceof BadRequestException) {
          res.status(error.getStatus()).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'Error streaming video' });
        }
      }
    }
  }
}