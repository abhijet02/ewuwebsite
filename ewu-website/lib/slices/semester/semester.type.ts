import { BaseAction } from "@lib/action.type";
import {
  GetSemestersResponse,
  GetSemestersRequest,
} from "@lib/services/semester/semester.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface SemesterSliceState {
  getSemestersStatus: FetchStatus;
  getSemestersError?: string;
  getSemestersResponse?: GetSemestersResponse;
}

export interface GetSemestersAction extends BaseAction {
  payload: {
    request: GetSemestersRequest;
  };
}

export interface GetSemestersSuccessAction extends BaseAction {
  payload: {
    response: GetSemestersResponse;
  };
}

export interface GetSemestersFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
