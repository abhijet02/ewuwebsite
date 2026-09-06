import { Publish } from "./calenderDate.service.type";

export interface ProgramCalender {
  id: number;
  year: number;
  label: string;
  order: number;
  isPublished: Publish;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
}

export interface GetProgramCalendersRequest {
  page: number;
  limit: number;
}

export interface GetProgramCalendersResponse {
  ProgramCalenders: ProgramCalender[];
}
