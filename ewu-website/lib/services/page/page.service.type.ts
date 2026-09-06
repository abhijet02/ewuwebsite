import { YesOrNo } from "../menu/menu.service.type";

export interface Page {
  id: number;
  label: string;
  link: string;
  seoDescription: string;
  seoKeywords: string[];
  isConvocationPage: YesOrNo;
  isHomePage: YesOrNo;
  homePageId: number;
  groupPageId: number;
  contentOf: number;
  facultyId: number;
  departmentId: number;
  clubId: number;
  officeId: number;
  createdAt: Date;
  updateAt: Date;
}

export interface GetPagesRequest {
  page: number;
  limit: number;
}

export interface GetPageByLinkRequest {
  link: String;
}


export interface GetPagesResponse {
  pages: Page[];
}

export interface GetPageByLinkResponse {
  pageByLink: Page[];
}
