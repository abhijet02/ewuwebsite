export interface ContactContent {
  id: number;
  text: string;
  header: string;
  link: string;
}
export interface ContactPhoto {
  id: number;
  contactInfoId: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface ContactInfo {
  id: number;
  pageId: number;
  address: string;
  primaryEmail: string;
  secondaryEmail: string;
  primaryPhone: string;
  officePhone: string;
  primaryHotline: string;
  secondaryHotline: string;
  link: string;
  contents?: ContactContent[];
  media?: ContactPhoto[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetContactInfoRequest {
  page: number;
  limit: number;
}

export interface GetContactInfoResponse {
  findAll: ContactInfo[];
}
