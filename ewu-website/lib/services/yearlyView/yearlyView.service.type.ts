export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface YearlyViewAttachment {
  id: number;
  yearlyViewId: number;
  attachmentUrl: string;
  attachmentName: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface YearlyView {
  id: number;
  pageId: number;
  photoUrl?: string;
  date: Date;
  year: string;
  title?: string;
  subTitle?: string;
  attachment1Url?: string;
  attachment1Name?: string;
  attachment2Url?: string;
  attachment2Name?: string;
  yearlyViewAttachment: YearlyViewAttachment[];
  isPublished: Publish;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetYearlyViewsRequest {
  page: number;
  limit: number;
}

export interface GetYearlyViewsResponse {
  yearlyViews: YearlyView[];
}
