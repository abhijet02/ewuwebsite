export interface Poe {
  id: number;
  departmentId: number;
  description?: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface GetPoesRequest {
  page: number;
  limit: number;
}

export interface GetPoesResponse {
  poes: Poe[];
}
