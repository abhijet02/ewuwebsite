export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface Hotline {
  id: number;
  title: string;
  link: string;
  logoLink: string;
  order: number;
  isPublished: Publish;
  createdAt: Date;
  updateAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetHotlineRequest {
  page: number;
  limit: number;
}

export interface GetHotlineResponse {
  hotlines: Hotline[];
}
