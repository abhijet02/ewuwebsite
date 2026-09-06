import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterDataService } from '../../../../prisma/prisma-master-data.service';
import {
  CreateFileDirectoryInput,
  CreateFileInput,
  UpdateFileDirectoryInput,
} from './dto/file-directory.input';
import {
  uploadFileStream,
  deleteFileAndDirectory,
  getFileMetadata,
  createDirectory,
  ensureDirectoryExists,
  getDirectoryList,
  renameFileOrDirectory
} from 'utils/file-upload.util';
import { readdirSync, statSync } from 'fs';
import { join, relative, basename } from 'path';

@Injectable()
export class FileDirectoryService {
  private uploadDir = join(process.env.UPLOAD_DIR, 'others', 'files');
  private rootDir = process.env.UPLOAD_DIR;
  private baseUrl = process.env.BASE_URL;

  constructor(private readonly prisma: PrismaMasterDataService) {}


  async createDirectory(dirPath: string): Promise<{ relativePath: string; fullPath: string; created: boolean }> {
    try {
      const fullPath = createDirectory(dirPath);
      return {
        relativePath: dirPath,
        fullPath,
        created: true
      };
    } catch (error) {
      throw new NotFoundException(`Failed to create directory: ${error.message}`);
    }
  }

   async getDirectoryList(path?: string): Promise<{
    currentPath: string;
    directories: any[];
    files: any[];
    totalCount: number;
  }> {
    try {
      const directoryInfo = await getDirectoryList(path);
      return directoryInfo;
    } catch (error) {
      throw new NotFoundException(`Failed to get directory list: ${error.message}`);
    }
  }

  async uploadToDirectory(
   input: CreateFileInput, userId: number
  ){
    try {
      // Ensure directory exists
      const { fullPath: targetDir } = ensureDirectoryExists(input.directoryPath);

      // Get file from promise if needed
      const fileData: any = await input.file;
      // Generate file name
      const originalName = fileData.filename;
      // Upload file to the specific directory
      const filePath = await uploadFileStream(
        fileData.createReadStream,
        targetDir,
        originalName,
      );
      // Get file metadata
      const fileMeta = await getFileMetadata(filePath);

      // Save to database
      const savedFile = await this.prisma.fileDeirectory.create({
        data: {
          fileName: originalName,
          fileUrl: filePath,
          fileMeta,
          createdBy: userId,
        },
      });

      return savedFile;
    } catch (error) {
      throw new NotFoundException(`Failed to upload file to directory: ${error.message}`);
    }
  }

  async create(input: CreateFileDirectoryInput) {
    let filePath = null;
    let meta = null;

    if (input.fileUrl) {
      const file: any = await input.fileUrl;
      const fileName = `${file.filename}`;
      filePath = await uploadFileStream(
        file.createReadStream,
        this.uploadDir,
        fileName,
      );

      const absPath = join(this.uploadDir, fileName);
      meta = await getFileMetadata(absPath);
    }

    return await this.prisma.fileDeirectory.create({
      data: {
        fileName: input.fileName,
        fileUrl: filePath,
        fileMeta: meta,
        createdBy: 0,
      },
    });
  }

  // Other methods...

  getFilesFromDirectory(
    subPath: string,
  ): { fileName: string; fileUrl: string }[] {
    const dirPath = join(this.rootDir, subPath);
    let files: string[];

    try {
      files = readdirSync(dirPath).filter((file) =>
        statSync(join(dirPath, file)).isFile(),
      );
    } catch (err) {
      throw new NotFoundException(`Directory not found: ${dirPath}`);
    }

    return files.map((fileName) => ({
      fileName,
      fileUrl: `${this.baseUrl}/${join(subPath, fileName).replace(/\\/g, '/')}`,
    }));
  }

  async importFilesFromDirectory(rootPath: string, createdBy = 0) {
    const allFiles = this.getAllFilesRecursively(rootPath);
    const insertedFiles = [];

    for (const filePath of allFiles) {
      const fileName = filePath.split(/[\\/]/).pop();
      const subPath = relative(this.rootDir, filePath).replace(/\\/g, '/');
      const fileUrl = `${this.rootDir}/${subPath}`;

      // Skip if already exists
      const existing = await this.prisma.fileDeirectory.findFirst({
        where: { fileName, fileUrl },
      });
      if (existing) continue;

      const fileMeta = await getFileMetadata(filePath);

      const inserted = await this.prisma.fileDeirectory.create({
        data: {
          fileName,
          fileUrl,
          fileMeta,
          createdBy,
        },
      });

      insertedFiles.push(inserted);
    }

    return insertedFiles;
  }

  private getAllFilesRecursively(dir: string): string[] {
    let results: string[] = [];

    const list = readdirSync(dir);
    list.forEach((file) => {
      const fullPath = join(dir, file);
      const stat = statSync(fullPath);

      if (stat && stat.isDirectory()) {
        results = results.concat(this.getAllFilesRecursively(fullPath));
      } else {
        results.push(fullPath);
      }
    });

    return results;
  }

  async findAll(page = 1, limit: number = 20) {
    return this.prisma.fileDeirectory.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number) {
    const file = await this.prisma.fileDeirectory.findUnique({ where: { id } });
    if (!file) throw new NotFoundException(`File with ID ${id} not found`);
    return file;
  }

  async update(id: number, input: UpdateFileDirectoryInput, userId: number) {
    const existing = await this.findOne(id);
    let updatedUrl = existing.fileUrl;
    let meta = existing.fileMeta;

    if (input.fileUrl) {
      if (existing.fileUrl) {
        const prevPath = existing.fileUrl.replace(
          `${process.env.BASE_URL}/`,
          '',
        );
        deleteFileAndDirectory(prevPath);
      }

      const file: any = await input.fileUrl;
      const fileName = `${Date.now()}_${file.filename}`;
      updatedUrl = await uploadFileStream(
        file.createReadStream,
        this.uploadDir,
        fileName,
      );

      const absPath = join(this.uploadDir, fileName);
      meta = await getFileMetadata(absPath);
    }

    return this.prisma.fileDeirectory.update({
      where: { id },
      data: {
        fileName: input.fileName ?? existing.fileName,
        fileUrl: updatedUrl,
        fileMeta: meta,
        updatedBy: userId,
      },
    });
  }

   async removeFile (fileUrl: string) {

    if (fileUrl) {
      const pathToDelete = fileUrl.replace(`${process.env.BASE_URL}/`, '');
      deleteFileAndDirectory(pathToDelete);
        return {
        success: true,
        message: `File ${fileUrl} removed successfully`,
      };
    }

    return  {
        success: false,
        message: `File ${fileUrl} Not removed`,
      };
  }

    /**
   * Rename a file or directory
   */
  async rename(
    oldPath: string,
    newPath: string,
    isDirectory: boolean = false,
  ): Promise<{ success: boolean; message: string; newPath: string }> {
    try {
      const basePath = process.env.FULL_UPLOAD_DIR || '/usr/src/app/uploads';
      const fullOldPath = join(basePath, oldPath);
      const fullNewPath = join(basePath, newPath);

      const newFullPath = renameFileOrDirectory(fullOldPath, fullNewPath);

    

      return {
        success: true,
        message: `${isDirectory ? 'Directory' : 'File'} renamed successfully`,
        newPath: newFullPath,
      };
    } catch (error) {
      throw new NotFoundException(`Failed to rename: ${error.message}`);
    }
  }

  async remove(id: number) {
    const file = await this.findOne(id);

    await this.prisma.fileDeirectory.delete({ where: { id } });

    if (file.fileUrl) {
      const pathToDelete = file.fileUrl.replace(`${process.env.BASE_URL}/`, '');
      deleteFileAndDirectory(pathToDelete);
    }

    return file;
  }
}
