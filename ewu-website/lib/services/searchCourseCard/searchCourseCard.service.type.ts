export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface SearchCourseCard {
  id: number;
  pageId?: number;
  title: string;
  subTitle: string;
  link: string;
  logoLink: string;
  isPublished: Publish;
  createdAt: Date;
  updateAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetSearchCourseCardRequest {
  page: number;
  limit: number;
}

export interface GetSearchCourseCardResponse {
  searchCourseCards: SearchCourseCard[];
}
