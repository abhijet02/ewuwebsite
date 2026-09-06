import { BaseAction } from "@lib/action.type";
import {
  GetViewAllsResponse,
  GetViewAllsRequest,
} from "@lib/services/viewAll/viewAll.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface ViewAllSliceState {
  getViewAllsStatus: FetchStatus;
  getViewAllsError?: string;
  getViewAllsResponse?: GetViewAllsResponse;
}

export interface GetViewAllsAction extends BaseAction {
  payload: {
    request: GetViewAllsRequest;
  };
}

export interface GetViewAllsSuccessAction extends BaseAction {
  payload: {
    response: GetViewAllsResponse;
  };
}

export interface GetViewAllsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
