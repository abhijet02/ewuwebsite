import { BaseAction } from "@lib/action.type";
import {
  GetSemesterCalendersResponse,
  GetSemesterCalendersRequest,
} from "@lib/services/calender/semesterCalender.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface SemesterCalenderSliceState {
  getSemesterCalendersStatus: FetchStatus;
  getSemesterCalendersError?: string;
  getSemesterCalendersResponse?: GetSemesterCalendersResponse;
  selectedSemeserId: number;
}

export interface GetSemesterCalendersAction extends BaseAction {
  payload: {
    request: GetSemesterCalendersRequest;
  };
}

export interface GetSemesterCalendersSuccessAction extends BaseAction {
  payload: {
    response: GetSemesterCalendersResponse;
  };
}

export interface GetSemesterCalendersFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
