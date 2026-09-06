import { BaseAction } from "@/lib/action.type";
import {
  GetContactInfoResponse,
  GetContactInfoRequest,
} from "@/lib/services/contactInfo/contactInfo.service.type";
import { FetchStatus } from "@/lib/services/fetch.type";

export interface ContactInfoSliceState {
  getContactInfoStatus: FetchStatus;
  getContactInfoError?: string;
  getContactInfoResponse?: GetContactInfoResponse;
}

export interface GetContactInfoAction extends BaseAction {
  payload: {
    request: GetContactInfoRequest;
  };
}

export interface GetContactInfoSuccessAction extends BaseAction {
  payload: {
    response: GetContactInfoResponse;
  };
}

export interface GetContactInfoFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
