export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface Builder {
  id: number;
  pageId: number;
  isLatestNewsEnable: YesOrNo;
  isHeaderEnable: YesOrNo;
  isHeader2Enable: YesOrNo;
  isHeader3Enable: YesOrNo;
  isClubHeaderEnable: YesOrNo;
  isSliderEnable: YesOrNo;
  isFooterEnable: YesOrNo;
  isFooter2Enable: YesOrNo;
  isFooter3Enable: YesOrNo;
  isClubFooterEnable: YesOrNo;
  sectionCount: number;
  createdAt: string;
  updateAt?: string;
  createdBy: number;
  updatedBy: number;
}

export interface GetBuildersRequest {
  page: number;
  limit: number;
}

export interface GetBuildersResponse {
  builders: Builder[];
}
