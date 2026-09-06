import { BaseAction } from "@/lib/action.type";
import {
  GetFacultysResponse,
  GetFacultysRequest,
} from "@/lib/services/faculty/faculty.service.type";
import { FetchStatus } from "@/lib/services/fetch.type";

export interface FacultySliceState {
  getFacultysStatus: FetchStatus;
  getFacultysError?: string;
  getFacultysResponse?: GetFacultysResponse;
}

export interface GetFacultysAction extends BaseAction {
  payload: {
    request: GetFacultysRequest;
  };
}

export interface GetFacultysSuccessAction extends BaseAction {
  payload: {
    response: GetFacultysResponse;
  };
}

export interface GetFacultysFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
