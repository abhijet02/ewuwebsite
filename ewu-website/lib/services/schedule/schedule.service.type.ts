export interface Schedule {
  id: number;
  day: string;
  officeMemberId: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetSchedulesRequest {
  page: number;
  limit: number;
}

export interface GetSchedulesResponse {
  schedules: Schedule[];
}
