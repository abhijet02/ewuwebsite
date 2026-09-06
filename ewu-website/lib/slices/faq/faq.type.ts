import { BaseAction } from "@lib/action.type";
import {
  GetFaqResponse,
  GetFaqRequest,
  Faq,
} from "@lib/services/faq/faq.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface FaqSliceState {
  getFaqStatus: FetchStatus;
  getFaqError?: string;
  getFaqResponse?: GetFaqResponse;
}

export interface GetFaqAction extends BaseAction {
  payload: {
    request: GetFaqRequest;
  };
}

export interface GetFaqSuccessAction extends BaseAction {
  payload: {
    response: GetFaqResponse;
  };
}

export interface GetFaqFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
