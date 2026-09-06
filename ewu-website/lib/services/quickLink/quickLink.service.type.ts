export interface QuickLink {
  id: number;
  label: String;
  url: String;
  category: String;
  createdAt: Date;
  updateAt: Date;
}

export interface GetQuickLinkRequest {
  page: number;
  limit: number;
}

export interface GetQuickLinkResponse {
  allQuickLinks: QuickLink[];
}
