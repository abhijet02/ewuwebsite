export interface Header {
  id: number;
  pageId: number;
  headerLogoUrl?: string;
  headerLogoLink?: string;
  megamenuTitle?: string;
  megaMenuBtn1Title?: string;
  megaMenuBtn1Link?: string;
  megaMenuBtn2Title?: string;
  megaMenuBtn2Link?: string;
  megaMenuBtn3Title?: string;
  megaMenuBtn3Link?: string;
  createdAt: Date;
  updatedAt?: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface GetHeadersRequest {
  page: number;
  limit: number;
}

export interface GetHeadersResponse {
  allHeader: Header[];
}
