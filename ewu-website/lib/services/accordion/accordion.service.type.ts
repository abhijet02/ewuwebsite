export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface Accordion {
  id: number;
  pageId: number;
  title: String;
  color: string;
  section: number;
  col: number;
  description: String;
  isPublished: Publish;
}

export interface GetAccordionsRequest {
  page: number;
  limit: number;
}

export interface GetAccordionsResponse {
  accordions: Accordion[];
}
