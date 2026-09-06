import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/user-service/src/guard/auth.guard';
import { FileDirectoryService } from './file-directory.service';
import {
  CreateDirectoryResponse,
  FileDirectory,
  FileUrlResponse,
  DirectoryListResponse,
  DeleteResponse,
  RenameResponse
} from './entities/file-deirectory.entity';
import {
  CreateFileDirectoryInput,
  CreateFileInput,
  UpdateFileDirectoryInput,
} from './dto/file-directory.input';
import { join } from 'path';

@Resolver(() => FileDirectory)
export class FileDirectoryResolver {
  constructor(private readonly fileDirectoryService: FileDirectoryService) {}


    // Add the new query for getting directory list
  @Query(() => DirectoryListResponse)
  async getDirectoryList(
    @Args('path', { type: () => String, nullable: true }) path?: string,
  ): Promise<DirectoryListResponse> {
    return this.fileDirectoryService.getDirectoryList(path);
  }

  @Query(() => [FileDirectory], { name: 'fileDirectories' })
  async getFileDirectories(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<FileDirectory[]> {
    return this.fileDirectoryService.findAll(page, limit);
  }

  @Query(() => FileDirectory, { name: 'fileDirectory' })
  async getFileDeirectory(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<FileDirectory> {
    return this.fileDirectoryService.findOne(id);
  }

  @Query(() => [FileUrlResponse])
  getFilesFromPath(@Args('subPath', { type: () => String }) subPath: string) {
    return this.fileDirectoryService.getFilesFromDirectory(subPath);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => [FileDirectory], { name: 'importFilesToDb' })
  async importFilesToDb(@Context() ctx): Promise<FileDirectory[]> {
    const rootPath = join(process.env.UPLOAD_DIR); // full uploads directory
    const userId = ctx.user.id;

    return this.fileDirectoryService.importFilesFromDirectory(rootPath, userId);
  }

    // Add the new mutations here
  @UseGuards(AuthGuard)
  @Mutation(() => CreateDirectoryResponse)
  async createDirectory(
    @Args('dirPath', { type: () => String }) dirPath: string,
  ): Promise<{ relativePath: string; fullPath: string; created: boolean }> {
    return this.fileDirectoryService.createDirectory(dirPath);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => FileDirectory)
  async uploadToDirectory(
    @Args('input') input: CreateFileInput,
    @Context() ctx,
  ): Promise<FileDirectory> {
    const userId = ctx.user.id;
    return this.fileDirectoryService.uploadToDirectory(input, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => DeleteResponse)
  async deleteFile(
    @Args('path') path: string,
  ): Promise<DeleteResponse> {
    return this.fileDirectoryService.removeFile(path);
  }


  @UseGuards(AuthGuard)
  @Mutation(() => RenameResponse)
  async renameFileOrDirectory(
    @Args('oldPath', { type: () => String }) oldPath: string,
    @Args('newPath', { type: () => String }) newPath: string,
    @Args('isDirectory', { type: () => Boolean, nullable: true }) isDirectory?: boolean,
  ): Promise<RenameResponse> {
    return this.fileDirectoryService.rename(oldPath, newPath, isDirectory);
  }

  @Mutation(() => [FileDirectory])
  @UseGuards(AuthGuard)
  async importFiles(
    @Args('subPath') subPath: string,
    @Context() ctx,
  ): Promise<FileDirectory[]> {
    return this.fileDirectoryService.importFilesFromDirectory(
      subPath,
      ctx.user.id,
    );
  }

  @Mutation(() => FileDirectory)
  async createFileDirectory(
    @Args('input') input: CreateFileDirectoryInput,
  ): Promise<FileDirectory> {
    return this.fileDirectoryService.create(input);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => FileDirectory)
  async updateFileDirectory(
    @Args('input') input: UpdateFileDirectoryInput,
    @Context() ctx,
  ): Promise<FileDirectory> {
    const userId = ctx.user.id;
    return this.fileDirectoryService.update(input.id, input, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => FileDirectory)
  async removeFileDirectory(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<FileDirectory> {
    return this.fileDirectoryService.remove(id);
  }
}
