import { BaseAction } from "@lib/action.type";
import {
  GetStudentsSaysResponse,
  GetStudentsSaysRequest,
} from "@lib/services/studentsSay/studentsSay.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface StudentsSaySliceState {
  getStudentsSaysStatus: FetchStatus;
  getStudentsSaysError?: string;
  getStudentsSaysResponse?: GetStudentsSaysResponse;
}

export interface GetStudentsSaysAction extends BaseAction {
  payload: {
    request: GetStudentsSaysRequest;
  };
}

export interface GetStudentsSaysSuccessAction extends BaseAction {
  payload: {
    response: GetStudentsSaysResponse;
  };
}

export interface GetStudentsSaysFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
