import { BaseAction } from "@/lib/action.type";
import {
  GetQuickLinkResponse,
  GetQuickLinkRequest,
  QuickLink,
} from "@/lib/services/quickLink/quickLink.service.type";
import { FetchStatus } from "@/lib/services/fetch.type";

export interface QuickLinkSliceState {
  getQuickLinkStatus: FetchStatus;
  getQuickLinkError?: string;
  getQuickLinkResponse?: GetQuickLinkResponse;
}

export interface GetQuickLinkAction extends BaseAction {
  payload: {
    request: GetQuickLinkRequest;
  };
}

export interface GetQuickLinkSuccessAction extends BaseAction {
  payload: {
    response: GetQuickLinkResponse;
  };
}

export interface GetQuickLinkFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
