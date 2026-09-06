import { FetchStatus } from "../fetch.type";

export interface FacultyMemberDocument {
  id: number;
  facultyId: number;
  order: number;
  fileName?: string;
  filePath?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface GetFacultyMemberDocumentsRequest {
  page: number;
  limit: number;
}

export interface GetFacultyMemberDocumentsResponse {
  facultyMemberDocuments: FacultyMemberDocument[];
}
