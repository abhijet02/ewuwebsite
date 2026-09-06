export enum Publish {
  YES = "YES",
  NO = "NO",
}

export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface NoticePhoto {
  id: number;
  noticeId: number;
  url: string;
  createdAt: Date;
  updateAt: Date;
}

export interface Notice {
  id: number;
  category: string;
  sub_category: string;
  pageId: number;
  isCopiedTo: number[];
  label: string;
  slug: string;
  order: number;
  description: string;
  date: Date;
  location: string;
  author: string;
  attachmentUrl: string;
  thumbnail: string;
  photos: NoticePhoto[];
  createdAt: Date;
  updateAt: Date;
  isMarquee: YesOrNo;
  isPublished: Publish;
  isArchived: YesOrNo;
  isApprovedByAdmin: YesOrNo;
}

export interface GetNoticesRequest {
  page: number;
  limit: number;
  pageId?: number
}

export interface GetNoticesResponse {
  getAllNotices: Notice[];
}
