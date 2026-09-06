export interface Faculty {
  id: number;
  slug: string;
  name: string;
  description: string;
  order: number;
  createdAt: Date;
  updateAt: Date;
  createdBy: number;
  updateBy: number;
}

export interface GetFacultysRequest {
  page: number;
  limit: number;
}

export interface GetFacultysResponse {
  faculties: Faculty[];
}
