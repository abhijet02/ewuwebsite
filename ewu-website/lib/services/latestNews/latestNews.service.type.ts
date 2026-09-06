export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface LatestNews {
  id: number;
  pageId: number;
  isCopiedTo: number;
  label: String;
  link: String;
  order: number;
  isPublished: Publish;
  entryDate: Date;
  expierDate: Date;
  createdAt: Date;
  updateAt: Date;
}

export interface GetLatestNewsRequest {
  page: number;
  limit: number;
}

export interface GetLatestNewsResponse {
  latestNews: LatestNews[];
}
