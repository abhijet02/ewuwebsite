export interface AboutOrg {
  id: number;
  sectionTitle: string | null;
  sectionSubTitle: string | null;
  aboutUstitle: string | null;
  aboutUs: string | null;
  missionTitle: string | null;
  mission: string | null;
  visionTitle: string | null;
  vision: string | null;
  mediaUrl: string | null;
  isPublished: Publish;
  createdAt: Date;
  updateAt: Date | null;
  createdBy: number;
  updatedBy: number | null;
}

export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface GetAboutOrgsRequest {
  page: number;
  limit: number;
}

export interface GetAboutOrgsResponse {
  aboutOrgs: AboutOrg[];
}
