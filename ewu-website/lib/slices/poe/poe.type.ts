import { BaseAction } from "@lib/action.type";
import {
  GetPoesResponse,
  GetPoesRequest,
} from "@lib/services/poe/poe.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface PoeSliceState {
  getPoesStatus: FetchStatus;
  getPoesError?: string;
  getPoesResponse?: GetPoesResponse;
}

export interface GetPoesAction extends BaseAction {
  payload: {
    request: GetPoesRequest;
  };
}

export interface GetPoesSuccessAction extends BaseAction {
  payload: {
    response: GetPoesResponse;
  };
}

export interface GetPoesFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
