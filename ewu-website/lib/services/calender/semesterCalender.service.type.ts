import { YesOrNo } from "./calenderDate.service.type";

export interface SemesterCalender {
  id: number;
  title: string;
  shortNote?: string;
  label: string;
  order: number;
  description?: string;
  attachmentUrl?: string;
  programId: number;
  isBiSemester: YesOrNo;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
}

export interface GetSemesterCalendersRequest {
  page: number;
  limit: number;
}

export interface GetSemesterCalendersResponse {
  SemesterCalenders: SemesterCalender[];
}
