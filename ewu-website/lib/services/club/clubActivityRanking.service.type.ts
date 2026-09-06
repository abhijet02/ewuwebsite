export interface ClubActivityRanking {
  id: number;
  clubId: number;
  groomingSessionCount: number;
  groomingSessionShortDescription?: string;
  competitionCount: number;
  competitionShortDescription?: string;
  seminerCount: number;
  seminerShortDescription?: string;
  workshopCount: number;
  workshopShortDescription?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetClubActivityRankingsRequest {
  page: number;
  limit: number;
}

export interface GetClubActivityRankingsResponse {
  allClubActivityRanking: ClubActivityRanking[];
}
