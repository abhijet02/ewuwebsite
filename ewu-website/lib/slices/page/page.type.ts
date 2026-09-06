import { BaseAction } from "@lib/action.type";
import {
  GetPagesResponse,
  GetPagesRequest,
  GetPageByLinkRequest,
  GetPageByLinkResponse,
} from "@lib/services/page/page.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface PageSliceState {
  getPagesStatus: FetchStatus;
  getPagesError?: string;
  getPagesResponse?: GetPagesResponse;
  getPageByLinkStatus: FetchStatus;
  getPageByLinkError?: string;
  getPageByLinkResponse?: GetPageByLinkResponse;
}

export interface GetPagesAction extends BaseAction {
  payload: {
    request: GetPagesRequest;
  };
}

export interface GetPagesSuccessAction extends BaseAction {
  payload: {
    response: GetPagesResponse;
  };
}

export interface GetPagesFailureAction extends BaseAction {
  payload: {
    error: string;
  };
  
}

export interface GetPageByLinkAction extends BaseAction {
  payload: {
    request: GetPageByLinkRequest;
  };
}

export interface GetPageByLinkSuccessAction extends BaseAction {
  payload: {
    response: GetPageByLinkResponse;
  };
}

export interface GetPageByLinkFailureAction extends BaseAction {
  payload: {
    error: string;
  };
  
}