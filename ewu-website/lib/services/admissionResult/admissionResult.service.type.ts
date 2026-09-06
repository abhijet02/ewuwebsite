export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface AdmissionResult {
  id: number;
  programCategoryId: number;
  semesterId: number;
  facultyId: number;
  year: number;
  title: string;
  fileUrl: string;
  publishDate: string;
  isArchived: YesOrNo;
  isPublished: YesOrNo;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetAdmissionResultsRequest {
  page: number;
  limit: number;
}

export interface GetAdmissionResultsResponse {
  admissionResults: AdmissionResult[];
}
