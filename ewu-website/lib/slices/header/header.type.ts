import { BaseAction } from "@lib/action.type";
import {
  GetHeadersResponse,
  GetHeadersRequest,
} from "@lib/services/header/header.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface HeaderSliceState {
  getHeadersStatus: FetchStatus;
  getHeadersError?: string;
  getHeadersResponse?: GetHeadersResponse;
}

export interface GetHeadersAction extends BaseAction {
  payload: {
    request: GetHeadersRequest;
  };
}

export interface GetHeadersSuccessAction extends BaseAction {
  payload: {
    response: GetHeadersResponse;
  };
}

export interface GetHeadersFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
