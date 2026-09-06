export enum Publish {
  YES = "YES",
  NO = "NO",
}

export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface NewsPhoto {
  id: number;
  newsId: number;
  url: string;
  createdAt: Date;
  updatedAt?: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface News {
  id: number;
  pageId: number;
  label: string;
  date: Date;
  description?: string;
  reporterName?: string;
  thumbnail?: string;
  isCopiedTo: number[];
  isMarquee: YesOrNo;
  isPublished: Publish;
  isArchived: YesOrNo;
  isApprovedByAdmin: YesOrNo;
  photos?: NewsPhoto[];
  slug: string;
  order: number;
  createdAt: Date;
  updateAt: Date;
  createdBy?: number;
  updatedBy?: number;
}

export interface GetNewsRequest {
  page: number;
  limit: number;
  pageId?: number;
}

export interface GetNewsBySlugRequest {
  slug: string;
}

export interface GetNewsResponse {
  allnews: News[];
}

export interface GetNewsBySlugResponse {
  newsBySlug: News;
}
