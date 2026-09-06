export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface Description {
  id: number;
  pageId: number;
  title: string;
  description: string;
  isPublished: Publish;
}

export interface GetDescriptionsRequest {
  page: number;
  limit: number;
}

export interface GetDescriptionsResponse {
  descriptions: Description[];
}