import { BaseAction } from "@lib/action.type";
import {
  GetAlumniResponse,
  GetAlumniRequest,
} from "@lib/services/alumni/alumni.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface AlumniSliceState {
  getAlumniStatus: FetchStatus;
  getAlumniError?: string;
  getAlumniResponse?: GetAlumniResponse;
}

export interface GetAlumnisAction extends BaseAction {
  payload: {
    request: GetAlumniRequest;
  };
}

export interface GetAlumnisSuccessAction extends BaseAction {
  payload: {
    response: GetAlumniResponse;
  };
}

export interface GetAlumnisFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
