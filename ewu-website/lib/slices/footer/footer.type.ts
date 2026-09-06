import { BaseAction } from "@lib/action.type";
import {
  GetFootersResponse,
  GetFootersRequest,
} from "@lib/services/footer/footer.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface FooterSliceState {
  getFootersStatus: FetchStatus;
  getFootersError?: string;
  getFootersResponse?: GetFootersResponse;
}

export interface GetFootersAction extends BaseAction {
  payload: {
    request: GetFootersRequest;
  };
}

export interface GetFootersSuccessAction extends BaseAction {
  payload: {
    response: GetFootersResponse;
  };
}

export interface GetFootersFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface RemoveFooterFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
