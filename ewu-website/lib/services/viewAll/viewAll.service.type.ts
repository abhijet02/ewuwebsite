export interface ViewAll {
  id: number;
  componentId: number;
  pageId: number;
  viewAllLink: string;
  createdAt: Date;
  updateAt?: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface GetViewAllsRequest {
  page: number;
  limit: number;
}

export interface GetViewAllsResponse {
  viewAlls: ViewAll[];
}
