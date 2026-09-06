import { BaseAction } from "@lib/action.type";
import {
  GetNewsMediaResponse,
  GetNewsMediaRequest,
  NewsMedia,
} from "@lib/services/newsMedia/newsMedia.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface NewsMediaSliceState {
  getNewsMediaStatus: FetchStatus;
  getNewsMediaError?: string;
  getNewsMediaResponse?: GetNewsMediaResponse;
}

export interface GetNewsMediaAction extends BaseAction {
  payload: {
    request: GetNewsMediaRequest;
  };
}

export interface GetNewsMediaSuccessAction extends BaseAction {
  payload: {
    response: GetNewsMediaResponse;
  };
}

export interface GetNewsMediaFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
