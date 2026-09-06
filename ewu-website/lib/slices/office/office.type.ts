import { BaseAction } from "@lib/action.type";
import {
  GetOfficesResponse,
  GetOfficesRequest,
} from "@lib/services/office/office.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface OfficeSliceState {
  getOfficesStatus: FetchStatus;
  getOfficesError?: string;
  getOfficesResponse?: GetOfficesResponse;
}

export interface GetOfficesAction extends BaseAction {
  payload: {
    request: GetOfficesRequest;
  };
}

export interface GetOfficesSuccessAction extends BaseAction {
  payload: {
    response: GetOfficesResponse;
  };
}

export interface GetOfficesFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
