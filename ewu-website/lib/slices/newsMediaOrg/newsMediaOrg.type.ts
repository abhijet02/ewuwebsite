import { BaseAction } from "@lib/action.type";
import {
  GetNewsMediaOrgResponse,
  GetNewsMediaOrgRequest,
  NewsMediaOrg,
} from "@lib/services/newsMediaOrg/newsMediaOrg.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface NewsMediaOrgSliceState {
  getNewsMediaOrgStatus: FetchStatus;
  getNewsMediaOrgError?: string;
  getNewsMediaOrgResponse?: GetNewsMediaOrgResponse;
}

export interface GetNewsMediaOrgAction extends BaseAction {
  payload: {
    request: GetNewsMediaOrgRequest;
  };
}

export interface GetNewsMediaOrgSuccessAction extends BaseAction {
  payload: {
    response: GetNewsMediaOrgResponse;
  };
}

export interface GetNewsMediaOrgFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
