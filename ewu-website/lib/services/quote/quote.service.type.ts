export interface Quote {
  id: number;
  pageId: number;
  name: string;
  designation: string;
  quote: string;
  url: string;
  imageUrl: string;
  nextThumbnailUrl: string;
}

export interface GetQuotesRequest {
  page: number;
  limit: number;
}

export interface GetQuotesResponse {
  Quotes: Quote[];
}
