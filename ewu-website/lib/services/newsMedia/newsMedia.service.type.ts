export enum Publish {
  YES = "YES",
  NO = "NO",
}

export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface NewsMediaFile {
  id: number;
  newsMediaId: number;
  orgName: string;
  thumbNailUrl: string;
  fileUrl: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface NewsMedia {
  id: number;
  pageId: number;
  label: string;
  description: string;
  category: string;
  slug: string;
  date: Date;
  thumbnail: string;
  link: string;
  isArchived: YesOrNo;
  isPublished: Publish;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
  files: NewsMediaFile[];
}

export interface GetNewsMediaRequest {
  page: number;
  limit: number;
}

export interface GetNewsMediaResponse {
  allNewsMedia: NewsMedia[];
}

export interface CreateNewsMediaFileRequest {
  orgName: string;
  thumbNailUrl: Blob;
  fileUrl: Blob;
  link: string;
}

export interface CreateNewsMediaRequest {
  pageId: number;
  label: string;
  date: Date;
  description: string;
  category: string;
  slug: string;
  thumbnail: Blob;
  link: string;
  files: NewsMediaFile[];
  isArchived: YesOrNo;
  isPublished: Publish;
}

export interface CreateNewsMediaResponse {
  createNewsMedia: NewsMedia;
}

export interface UpdateNewsMediaRequest extends CreateNewsMediaRequest {
  id: number;
}

export interface UpdateNewsMediaResponse {
  updateNewsMedia: NewsMedia;
}

export interface RemoveNewsMediaRequest {
  id: number;
}

export interface RemoveNewsMediaResponse {
  removeNewsMedia: NewsMedia;
}
