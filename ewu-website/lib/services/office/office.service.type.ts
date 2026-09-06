export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface Office {
  id: number;
  slug: string;
  isBOT: YesOrNo;
  isAuthority: YesOrNo;
  isDepartmental: YesOrNo;
  departmentId: number;
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface GetOfficesRequest {
  page: number;
  limit: number;
}

export interface GetOfficesResponse {
  offices: Office[];
}
