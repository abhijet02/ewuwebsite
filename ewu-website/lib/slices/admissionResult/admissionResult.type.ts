import { BaseAction } from "@lib/action.type";
import {
  GetAdmissionResultsResponse,
  GetAdmissionResultsRequest,
} from "@lib/services/admissionResult/admissionResult.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface AdmissionResultSliceState {
  getAdmissionResultsStatus: FetchStatus;
  getAdmissionResultsError?: string;
  getAdmissionResultsResponse?: GetAdmissionResultsResponse;
}

export interface GetAdmissionResultsAction extends BaseAction {
  payload: {
    request: GetAdmissionResultsRequest;
  };
}

export interface GetAdmissionResultsSuccessAction extends BaseAction {
  payload: {
    response: GetAdmissionResultsResponse;
  };
}

export interface GetAdmissionResultsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
