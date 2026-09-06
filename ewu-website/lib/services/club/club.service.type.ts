export interface Club {
  id: number;
  slug: string;
  title: string;
  order: number;
  introduction: string;
  mission: string;
  vission: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetClubsRequest {
  page: number;
  limit: number;
}

export interface GetClubsResponse {
  allClub: Club[];
}
