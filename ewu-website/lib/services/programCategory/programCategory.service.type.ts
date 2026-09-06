export interface ProgramCategory {
  id: number;
  title: string;
  order: number;
  programDetails: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
}

export interface GetProgramCategoriesRequest {
  page: number;
  limit: number;
}

export interface GetProgramCategoriesResponse {
  programCategories: ProgramCategory[];
}
