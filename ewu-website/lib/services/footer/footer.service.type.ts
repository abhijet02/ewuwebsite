export interface Footer {
  id: number;
  pageId: number;
  headerText?: string;
  footerApplyNowText?: string;
  footerApplyNowLink?: string;
  footerLogoUrl?: string;
  footerMediaUrl?: string;
  footerContactUsMobile?: string;
  footerContactUsEmail?: string;
  footerContactUsHotline?: string;
  footerAddress?: string;
  footerMapPath?: string;
  footerMap?: string;
  footerCopyRightTitle?: string;
  createdAt: Date;
  updatedAt?: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface GetFootersRequest {
  page: number;
  limit: number;
}

export interface GetFootersResponse {
  allFooter: Footer[];
}
