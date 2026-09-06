export enum Publish {
  YES = "YES",
  NO = "NO",
}

export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface AchievementPhoto {
  id: number;
  achievementId: number;
  url: string;
  createdAt: Date;
  updatedAt?: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface Achievement {
  id: number;
  pageId: number;
  category: string;
  label: string;
  date: Date;
  description?: string;
  thumbnail?: string;
  isMarquee: YesOrNo;
  isPublished: Publish;
  isArchived: YesOrNo;
  isApprovedByAdmin: YesOrNo;
  photos?: AchievementPhoto[];
  slug: string;
  order: number;
  isCopiedTo: number[];
  createdAt: Date;
  updateAt: Date;
  createdBy?: number;
  updatedBy?: number;
}

export interface GetAchievementsRequest {
  page: number;
  limit: number;
  pageId?: number;
}

export interface GetAchievementsResponse {
  allAchievements: Achievement[];
}
