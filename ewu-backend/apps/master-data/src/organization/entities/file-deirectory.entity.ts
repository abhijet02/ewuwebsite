import { ObjectType, Field, Int } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'middleware/pathFinderMiddleware';

@ObjectType()
export class FileDirectory {
  @Field(() => Int)
  id: number;

  @Field()
  fileName: string;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  fileUrl?: string;

  @Field({ nullable: true })
  fileMeta?: string;


  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;
}

@ObjectType()
export class CreateDirectoryResponse {
  @Field()
  relativePath: string;

  @Field()
  fullPath: string;

  @Field()
  created: boolean;
}

@ObjectType()
export class DeleteResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

@ObjectType()
export class RenameResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field()
  newPath: string;
}

@ObjectType()
export class DirectoryInfo {
  @Field()
  name: string;

  @Field()
  path: string;

  @Field()
  isDirectory: boolean;

  @Field(() => Int, { nullable: true })
  size?: number;

  @Field({ nullable: true })
  modifiedAt?: string;

  @Field({ nullable: true })
  createdAt?: string;
}

@ObjectType()
export class DirectoryListResponse {
  @Field()
  currentPath: string;

  @Field(() => [DirectoryInfo])
  directories: DirectoryInfo[];

  @Field(() => [DirectoryInfo])
  files: DirectoryInfo[];

  @Field(() => Int)
  totalCount: number;
}

@ObjectType()
export class FileUrlResponse {
  @Field()
  fileName: string;

  @Field()
  fileUrl: string;
}

