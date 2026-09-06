import { BaseAction } from "@lib/action.type";
import {
  Schedule,
  GetSchedulesRequest,
  GetSchedulesResponse,
} from "@lib/services/schedule/schedule.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface ScheduleSliceState {
  getScheduleStatus: FetchStatus;
  getScheduleError?: string;
  getScheduleResponse?: GetSchedulesResponse;
}

export interface GetSchedulesAction extends BaseAction {
  payload: {
    request: GetSchedulesRequest;
  };
}

export interface GetScheduleSuccessAction extends BaseAction {
  payload: {
    response: GetSchedulesResponse;
  };
}

export interface GetScheduleFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
