import { BaseAction } from "@/lib/action.type";
import {
  GetDesignationsResponse,
  GetDesignationsRequest,
  Designation,
} from "@/lib/services/designation/designation.service.type";
import { FetchStatus } from "@/lib/services/fetch.type";

export interface DesignationSliceState {
  getDesignationsStatus: FetchStatus;
  getDesignationsError?: string;
  getDesignationsResponse?: GetDesignationsResponse;
}

export interface GetDesignationsAction extends BaseAction {
  payload: {
    request: GetDesignationsRequest;
  };
}

export interface GetDesignationsSuccessAction extends BaseAction {
  payload: {
    response: GetDesignationsResponse;
  };
}

export interface GetDesignationsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
