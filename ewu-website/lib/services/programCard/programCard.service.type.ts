export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface ProgramCard {
  id: number;
  pageId?: number;
  title: string;
  link: string;
  logoLink: string;
  isPublished: Publish;
  createdAt: Date;
  updateAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetProgramCardRequest {
  page: number;
  limit: number;
}

export interface GetProgramCardResponse {
  programCards: ProgramCard[];
}
