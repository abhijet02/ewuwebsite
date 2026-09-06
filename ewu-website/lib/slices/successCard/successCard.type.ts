import { BaseAction } from "@lib/action.type";
import {
  GetSuccessCardResponse,
  GetSuccessCardRequest,
} from "@lib/services/successCard/successCard.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface SuccessCardSliceState {
  getSuccessCardStatus: FetchStatus;
  getSuccessCardError?: string;
  getSuccessCardResponse?: GetSuccessCardResponse;
}

export interface GetSuccessCardAction extends BaseAction {
  payload: {
    request: GetSuccessCardRequest;
  };
}

export interface GetSuccessCardSuccessAction extends BaseAction {
  payload: {
    response: GetSuccessCardResponse;
  };
}

export interface GetSuccessCardFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
