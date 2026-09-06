export enum Publish {
  YES = "YES",
  NO = "NO",
}

export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface Procurement {
  id: number;
  title: string;
  fileUrl?: string;
  publishDate: string;
  isArchived: YesOrNo;
  isPublished: Publish;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetProcurementsRequest {
  page: number;
  limit: number;
}

export interface GetProcurementsResponse {
  procurements: Procurement[];
}
