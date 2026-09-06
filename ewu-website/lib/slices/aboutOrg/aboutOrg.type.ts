import { BaseAction } from "@lib/action.type";
import {
  GetAboutOrgsResponse,
  GetAboutOrgsRequest,
  AboutOrg,
} from "@lib/services/aboutOrg/aboutOrg.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface AboutOrgSliceState {
  getAboutOrgsStatus: FetchStatus;
  getAboutOrgsError?: string;
  getAboutOrgsResponse?: GetAboutOrgsResponse;
}

export interface GetAboutOrgsAction extends BaseAction {
  payload: {
    request: GetAboutOrgsRequest;
  };
}

export interface GetAboutOrgsSuccessAction extends BaseAction {
  payload: {
    response: GetAboutOrgsResponse;
  };
}

export interface GetAboutOrgsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
