export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface SuccessCard {
  id: number;
  title: string;
  countLabel: string;
  logoLink: string;
  isPublished: Publish;
  createdAt: Date;
  updateAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetSuccessCardRequest {
  page: number;
  limit: number;
}

export interface GetSuccessCardResponse {
  successCards: SuccessCard[];
}
