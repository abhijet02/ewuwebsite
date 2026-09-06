export interface Publication {
  id: number;
  facultyPersonId: number;
  title: string;
  details: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetPublicationsRequest {
  page: number;
  limit: number;
}

export interface GetPublicationsResponse {
  publications: Publication[];
}
