export interface FaqKeyword {
  id: number;
  label: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}
export interface GetFaqKeywordRequest {
  page: number;
  limit: number;
}

export interface GetFaqKeywordResponse {
  faqkeywords: FaqKeyword[];
}
