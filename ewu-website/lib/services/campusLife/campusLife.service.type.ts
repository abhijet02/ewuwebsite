export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface CampusLife {
  id: number;
  pageId: number;
  title: string;
  subtitle: string;
  link: string;
  mediaUrl: string;
  description: string;
  isPublished: Publish;
  createdAt: Date;
  updateAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetCampusLifesRequest {
  page: number;
  limit: number;
}

export interface GetCampusLifesResponse {
  campusLifeContents: CampusLife[];
}

export interface GetCampusLifeRequest {
  id: number;
}

export interface GetCampusLifeResponse {
  campusLifeContent: CampusLife;
}
