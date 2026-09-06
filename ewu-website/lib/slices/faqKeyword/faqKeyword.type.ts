import { BaseAction } from "@lib/action.type";
import {
  GetFaqKeywordResponse,
  GetFaqKeywordRequest,
} from "@lib/services/faqKeyword/faqKeyword.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface FaqKeywordSliceState {
  getFaqKeywordStatus: FetchStatus;
  getFaqKeywordError?: string;
  getFaqKeywordResponse?: GetFaqKeywordResponse;
}

export interface GetFaqKeywordAction extends BaseAction {
  payload: {
    request: GetFaqKeywordRequest;
  };
}

export interface GetFaqKeywordSuccessAction extends BaseAction {
  payload: {
    response: GetFaqKeywordResponse;
  };
}

export interface GetFaqKeywordFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
