import { BaseAction } from "@lib/action.type";
import {
  GetProgramCalendersResponse,
  GetProgramCalendersRequest,
} from "@lib/services/calender/programCalender.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface ProgramCalenderSliceState {
  getProgramCalendersStatus: FetchStatus;
  getProgramCalendersError?: string;
  getProgramCalendersResponse?: GetProgramCalendersResponse;
  selectedYear: number;
}

export interface GetProgramCalendersAction extends BaseAction {
  payload: {
    request: GetProgramCalendersRequest;
  };
}

export interface GetProgramCalendersSuccessAction extends BaseAction {
  payload: {
    response: GetProgramCalendersResponse;
  };
}

export interface GetProgramCalendersFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
