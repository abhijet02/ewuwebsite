export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface FollowUs {
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

export interface GetFollowUsRequest {
  page: number;
  limit: number;
}

export interface GetFollowUsResponse {
  followUsList: FollowUs[];
}
