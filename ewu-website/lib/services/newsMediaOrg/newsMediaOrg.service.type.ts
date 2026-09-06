export interface NewsMediaOrg {
  id: number;
  newsMediaId: number;
  title: string;
  link: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetNewsMediaOrgRequest {
  page: number;
  limit: number;
}

export interface GetNewsMediaOrgResponse {
  newsMediaOrgs: NewsMediaOrg[];
}
