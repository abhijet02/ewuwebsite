export interface Category {
  id: number;
  componentId: number;
  category: string;
}

export interface GetCategoriesRequest {
  page: number;
  limit: number;
}

export interface GetCategoriesResponse {
  categories: Category[];
}
