import { BaseAction } from "@lib/action.type";
import {
  GetProgramsResponse,
  GetProgramsRequest,
} from "@lib/services/program/program.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface ProgramSliceState {
  getProgramsStatus: FetchStatus;
  getProgramsError?: string;
  getProgramsResponse?: GetProgramsResponse;
}

export interface GetProgramsAction extends BaseAction {
  payload: {
    request: GetProgramsRequest;
  };
}

export interface GetProgramsSuccessAction extends BaseAction {
  payload: {
    response: GetProgramsResponse;
  };
}

export interface GetProgramsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
