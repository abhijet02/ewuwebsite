export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface Faq {
  id: number;
  pageId: number;
  keywordId: number;
  title: string;
  answer: string;
  link: string;
  order: number;
  isPublished: Publish;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetFaqRequest {
  page: number;
  limit: number;
}
export interface GetFaqResponse {
  faqs: Faq[];
}
