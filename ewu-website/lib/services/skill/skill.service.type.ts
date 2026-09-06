export interface Skill {
  id: number;
  clubId: number;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface GetSkillsRequest {
  page: number;
  limit: number;
}

export interface GetSkillsResponse {
  skills: Skill[];
}
