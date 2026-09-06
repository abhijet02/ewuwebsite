import { BaseAction } from "@/lib/action.type";
import {
  GetLatestNewsResponse,
  GetLatestNewsRequest,
  LatestNews,
} from "@/lib/services/latestNews/latestNews.service.type";
import { FetchStatus } from "@/lib/services/fetch.type";
export interface LatestNewsSliceState {
  getLatestNewsStatus: FetchStatus;
  getLatestNewsError?: string;
  getLatestNewsResponse?: GetLatestNewsResponse;
}

export interface GetLatestNewsAction extends BaseAction {
  payload: {
    request: GetLatestNewsRequest;
  };
}

export interface GetLatestNewsSuccessAction extends BaseAction {
  payload: {
    response: GetLatestNewsResponse;
  };
}

export interface GetLatestNewsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
