import { BaseAction } from "@lib/action.type";
import {
  GetCalenderDatesResponse,
  GetCalenderDatesRequest,
} from "@lib/services/calender/calenderDate.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface CalenderDateSliceState {
  getCalenderDatesStatus: FetchStatus;
  getCalenderDatesError?: string;
  getCalenderDatesResponse?: GetCalenderDatesResponse;
}

export interface GetCalenderDatesAction extends BaseAction {
  payload: {
    request: GetCalenderDatesRequest;
  };
}

export interface GetCalenderDatesSuccessAction extends BaseAction {
  payload: {
    response: GetCalenderDatesResponse;
  };
}

export interface GetCalenderDatesFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
