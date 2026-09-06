import { BaseAction } from "@/lib/action.type";
import {
  GetNoticesResponse,
  GetNoticesRequest,
  Notice,
} from "@/lib/services/notice/notice.service.type";
import { FetchStatus } from "@/lib/services/fetch.type";

export interface NoticeSliceState {
  getNoticeStatus: FetchStatus;
  getNoticeError?: string;
  getNoticeResponse?: GetNoticesResponse;
}

export interface GetNoticesAction extends BaseAction {
  payload: {
    request: GetNoticesRequest;
  };
}

export interface GetNoticesSuccessAction extends BaseAction {
  payload: {
    response: GetNoticesResponse;
  };
}

export interface GetNoticesFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
