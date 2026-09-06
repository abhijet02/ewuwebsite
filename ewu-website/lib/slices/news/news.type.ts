import { BaseAction } from "@lib/action.type";
import {
  GetNewsResponse,
  GetNewsRequest,
  News,
  GetNewsBySlugResponse,
  GetNewsBySlugRequest,
} from "@lib/services/news/news.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface NewsSliceState {
  getNewsStatus: FetchStatus;
  getNewsError?: string;
  getNewsResponse?: GetNewsResponse;
  getNewsBySlugStatus: FetchStatus;
  getNewsBySlugError?: string;
  getNewsBySlugResponse?: GetNewsBySlugResponse;  
}

export interface GetNewsAction extends BaseAction {
  payload: {
    request: GetNewsRequest;
  };
}

export interface GetNewsSuccessAction extends BaseAction {
  payload: {
    response: GetNewsResponse;
  };
}

export interface GetNewsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface GetNewsBySlugAction extends BaseAction {
  payload: {
    request: GetNewsBySlugRequest;
  };
}

export interface GetNewsBySlugSuccessAction extends BaseAction {
  payload: {
    response: GetNewsBySlugResponse;
  };
}

export interface GetNewsBySlugFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
