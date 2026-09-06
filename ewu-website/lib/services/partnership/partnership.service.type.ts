export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface Partnership {
  id: number;
  pageId: number;
  name: string;
  logoUrl?: string;
  isPublished: Publish;
  origin?: string;
  websiteLink?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetPartnershipsRequest {
  page: number;
  limit: number;
}

export interface GetPartnershipsResponse {
  patnerships: Partnership[];
}
