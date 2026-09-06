export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface OfficeMemberDocument {
  id: number;
  officeId: number;
  order: number;
  fileName?: string;
  filePath?: string;
  isCertificate: YesOrNo;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface GetOfficeMemberDocumentsRequest {
  page: number;
  limit: number;
}

export interface GetOfficeMemberDocumentsResponse {
  officeMemberDocuments: OfficeMemberDocument[];
}
