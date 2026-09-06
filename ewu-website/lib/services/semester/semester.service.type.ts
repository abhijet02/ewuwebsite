export interface Semester {
  id: number;
  title: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface GetSemestersRequest {
  page: number;
  limit: number;
}

export interface GetSemestersResponse {
  semesters: Semester[];
}
