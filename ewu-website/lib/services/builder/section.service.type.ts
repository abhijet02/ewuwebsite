export interface Section {
  id: number;
  pageId: number;
  secetionOrder: number;
  sectionTitle?: string;
  sectionSubTitle?: string;
  sectionBackgroundColor?: string;
  columRatio: string;
  columnOrder: number;
  componentId: number;
}

export interface GetSectionsRequest {
  page: number;
  limit: number;
}

export interface GetSectionsResponse {
  sections: Section[];
}
