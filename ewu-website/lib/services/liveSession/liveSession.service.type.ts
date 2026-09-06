export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface LiveSession {
  id: number;
  title: string;
  platform: string;
  link: string;
  expiryDate: string;
  isPublished: Publish;
  createdAt: Date;
  updateAt: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface GetLiveSessionsRequest {
  page: number;
  limit: number;
}

export interface GetLiveSessionsResponse {
  liveSessions: LiveSession[];
}

export interface CreateLiveSessionRequest {
  title: string;
  platform: string;
  link: string;
  expiryDate: string;
  isPublished?: Publish;
}

export interface CreateLiveSessionResponse {
  createLiveSession: LiveSession;
}

export interface UpdateLiveSessionRequest extends CreateLiveSessionRequest {
  id: number;
}

export interface UpdateLiveSessionResponse {
  updateLiveSession: LiveSession;
}

export interface RemoveLiveSessionRequest {
  id: number;
}

export interface RemoveLiveSessionResponse {
  removeLiveSession: LiveSession;
}
