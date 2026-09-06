import { NotFoundException } from '@nestjs/common';
import {
  createWriteStream,
  mkdirSync,
  stat,
  readdir,
  existsSync,
  rmdirSync,
  unlinkSync,
  statSync,
  readFileSync,
  renameSync
} from 'fs';
import { join, dirname } from 'path';
import { finished } from 'stream/promises';
import { Logger } from '@nestjs/common';
import { FileTypeResult, fileTypeFromBuffer } from 'file-type';
import { imageSize } from 'image-size';

const logger = new Logger('Utils: Upload  File');



// Helper function to check if directory exists using the imported fs methods
async function access(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    stat(path, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function getDirectoryList(basePath?: string): Promise<{
  currentPath: string;
  directories: any[];
  files: any[];
  totalCount: number;
}> {
  try {
    // Set default path if not provided
    const rootPath = process.env.UPLOAD_DIR || './uploads';
    const currentPath = basePath ? join(rootPath, basePath) : rootPath;

    // Check if directory exists using the helper function
    try {
      await access(currentPath);
    } catch {
      throw new Error(`Directory does not exist: ${currentPath}`);
    }

    // Read directory contents using imported readdir
    const items = await new Promise<any[]>((resolve, reject) => {
      readdir(currentPath, { withFileTypes: true }, (err, files) => {
        if (err) reject(err);
        else resolve(files as any);
      });
    });
    
    const directories = [];
    const files = [];

    for (const item of items) {
      const itemPath = join(currentPath, item?.name);
      
      // Get file stats using imported stat
      const stats = await new Promise<any>((resolve, reject) => {
        stat(itemPath, (err, stats) => {
          if (err) reject(err);
          else resolve(stats);
        });
      });
      
      const itemInfo = {
        name: item.name,
        path: basePath ? join(basePath, item.name) : item.name,
        isDirectory: stats.isDirectory(),
        size: stats.isDirectory() ? undefined : stats.size,
        modifiedAt: stats.mtime.toISOString(),
        createdAt: stats.birthtime.toISOString(),
      };

      if (stats.isDirectory()) {
        directories.push(itemInfo);
      } else {
        files.push(itemInfo);
      }
    }

    // Sort directories first, then files
    directories.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));

    return {
      currentPath: basePath || '/',
      directories,
      files,
      totalCount: directories.length + files.length,
    };
  } catch (error) {
    throw new Error(`Failed to read directory: ${error.message}`);
  }
}

/**
 * Create directory recursively if it doesn't exist within /uploads base
 * @param dirPath - The directory path relative to /uploads
 * @returns string - Full path of the created directory
 */
export const createDirectory = (dirPath: string): string => {
  try {
    const fullPath = join(process.env.FULL_UPLOAD_DIR, dirPath);
    if (!existsSync(fullPath)) {
      mkdirSync(fullPath, { recursive: true });
      logger.log(`Directory created: ${fullPath}`);
    }
    return fullPath;
  } catch (error) {
    logger.error(`Failed to create directory ${dirPath}:`, error);
    throw error;
  }
};


/**
 * Check if directory exists and create if it doesn't within /uploads base
 * @param dirPath - The directory path relative to /uploads
 * @returns Object with existence status and creation info
 */
export const ensureDirectoryExists = (dirPath: string): { relativePath: string; fullPath: string; exists: boolean; created: boolean } => {
  const fullPath = join(process.env.UPLOAD_DIR, dirPath);
  const exists = existsSync(fullPath);
  if (!exists) {
    createDirectory(dirPath);
    return { relativePath: dirPath, fullPath, exists: false, created: true };
  }
  return { relativePath: dirPath, fullPath, exists: true, created: false };
};

export const getFileUploadPath = async <T extends Record<string, any>>(
  input: T,
  key: keyof T,
  uploadDir: string,
): Promise<string> => {
  try {
    const file = input[key];
    if (!file) return '';

    // Expecting file to be a Promise or directly the file object
    const imageFile = await file;
    if (!imageFile || typeof imageFile.createReadStream !== 'function') {
      throw new Error(`Invalid file object for key "${String(key)}"`);
    }

    const fileName = `${Date.now()}_${imageFile.filename}`;
    const filePath = await uploadFileStream(
      imageFile.createReadStream,
      uploadDir,
      fileName,
    );

    return filePath;
  } catch (error) {
    console.error(`Error uploading file for key "${String(key)}":`, error);
    throw error;
  }
};

export const uploadFileStream = async (
  readStream,
  uploadDir,
  filename,
  mimetype?,
) => {
  const fileName = filename;
  const filePath = join(uploadDir, fileName);
  logger.log(`line: 12 Uploaded file path: ${filePath}`);
  try {
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }
    const inStream = readStream();
    const outStream = createWriteStream(filePath);
    outStream.on('error', (err) => {
      console.error('Stream error:', err);
      throw new Error(err.message);
    });
    inStream.pipe(outStream);
    await finished(outStream)
      .then(() => {
        logger.log('line: 20 file uploaded successfully');
      })
      .catch((err) => {
        logger.log(`line: 23 ${err.message}`);
        throw new NotFoundException(err.message);
      });
    return filePath;
  } catch (e) {
    logger.log(`line: 20 ${e}`);
  }
};

export const deleteFileAndDirectory = (
  filePath: string,
  uploadDir?: string,
  uploadRoot?: string,
) => {
  try {
    if (existsSync(filePath)) {
      stat(filePath, (error, stat) => {
        if (error) throw new Error('File do not exist');
        if (stat.isFile()) {
          unlinkSync(filePath); // Step 1:  Delete file
          // Step 2:  Delete Directories
          if (existsSync(uploadDir)) {
            readdir(uploadDir, function (err, files) {
              if (err) {
                throw new Error(`Dir ${uploadDir} not exist`);
              } else {
                if (!files.length) {
                  // If no  file exist
                  rmdirSync(uploadDir);
                }
              }
            });
          }
          if (existsSync(uploadRoot)) {
            readdir(uploadRoot, function (err, files) {
              if (err) {
                throw new Error(`Dir ${uploadRoot} not exist`);
              } else {
                if (!files.length) {
                  rmdirSync(uploadRoot);
                }
              }
            });
          }
        }
      });
    }
  } catch (e) {
    logger.log(`line: 20 ${e}`);
  }
};

/**
 * Delete a file from the filesystem
 * @param filePath - Full path to the file to delete
 * @returns boolean - True if deletion was successful
 */
export const deleteFile = (filePath: string): boolean => {
  try {
    if (existsSync(filePath)) {
      unlinkSync(filePath);
      logger.log(`File deleted: ${filePath}`);
      return true;
    } else {
      logger.warn(`File not found for deletion: ${filePath}`);
      return false;
    }
  } catch (error) {
    logger.error(`Failed to delete file ${filePath}:`, error);
    throw new Error(`Failed to delete file: ${error.message}`);
  }
};


/**
 * Rename a file or directory
 * @param oldPath - Current path of the file/directory
 * @param newPath - New path for the file/directory
 * @returns string - New path after renaming
 */
export const renameFileOrDirectory = (oldPath: string, newPath: string): string => {
  try {
    if (!existsSync(oldPath)) {
      throw new Error(`Path not found: ${oldPath}`);
    }

    // Ensure parent directory of new path exists
    const newParentDir = dirname(newPath);
    if (!existsSync(newParentDir)) {
      mkdirSync(newParentDir, { recursive: true });
    }

    renameSync(oldPath, newPath);
    logger.log(`Renamed: ${oldPath} -> ${newPath}`);
    return newPath;
  } catch (error) {
    logger.error(`Failed to rename ${oldPath} to ${newPath}:`, error);
    throw new Error(`Failed to rename: ${error.message}`);
  }
};

export async function getFileMetadata(filePath: string): Promise<string> {
  const buffer = readFileSync(filePath);
  const stat = statSync(filePath);
  const fileSizeInKB = Math.round(stat.size / 1024);
  const type: FileTypeResult | undefined = await fileTypeFromBuffer(buffer);

  if (!type) return `${fileSizeInKB} KB`;

  if (type.mime.startsWith('image/')) {
    try {
      const dimensions = imageSize(buffer);
      if (dimensions.width && dimensions.height) {
        return `${dimensions.width} x ${dimensions.height}`;
      }
    } catch {
      return `${fileSizeInKB} KB`;
    }
  }

  return `${fileSizeInKB} KB`;
}
