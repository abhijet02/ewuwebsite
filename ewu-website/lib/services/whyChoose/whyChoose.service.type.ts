export interface WhyChoose {
  id: number;
  label: string;
  order: number;
  departmentId: number;
  photoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetWhyChoosesRequest {
  page: number;
  limit: number;
}

export interface GetWhyChoosesResponse {
  whyChooseDepartments: WhyChoose[];
}
