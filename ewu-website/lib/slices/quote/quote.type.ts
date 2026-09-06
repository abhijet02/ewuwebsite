import { BaseAction } from "@/lib/action.type";
import {
  GetQuotesResponse,
  GetQuotesRequest,
  Quote,
} from "@/lib/services/quote/quote.service.type";
import { FetchStatus } from "@/lib/services/fetch.type";

export interface QuoteSliceState {
  getQuotesStatus: FetchStatus;
  getQuotesError?: string;
  getQuotesResponse?: GetQuotesResponse;
}

export interface GetQuotesAction extends BaseAction {
  payload: {
    request: GetQuotesRequest;
  };
}

export interface GetQuotesSuccessAction extends BaseAction {
  payload: {
    response: GetQuotesResponse;
  };
}

export interface GetQuotesFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
