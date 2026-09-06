import { BaseAction } from "@lib/action.type";
import {
  GetHotlineResponse,
  GetHotlineRequest,
} from "@lib/services/hotline/hotline.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface HotlineSliceState {
  getHotlineStatus: FetchStatus;
  getHotlineError?: string;
  getHotlineResponse?: GetHotlineResponse;
}

export interface GetHotlineAction extends BaseAction {
  payload: {
    request: GetHotlineRequest;
  };
}

export interface GetHotlineSuccessAction extends BaseAction {
  payload: {
    response: GetHotlineResponse;
  };
}

export interface GetHotlineFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
