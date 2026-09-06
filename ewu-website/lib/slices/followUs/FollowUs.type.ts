import { BaseAction } from "@lib/action.type";
import {
  GetFollowUsResponse,
  GetFollowUsRequest,
} from "@lib/services/followUs/followUs.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface FollowUsSliceState {
  getFollowUsStatus: FetchStatus;
  getFollowUsError?: string;
  getFollowUsResponse?: GetFollowUsResponse;
}

export interface GetFollowUsAction extends BaseAction {
  payload: {
    request: GetFollowUsRequest;
  };
}

export interface GetFollowUsSuccessAction extends BaseAction {
  payload: {
    response: GetFollowUsResponse;
  };
}

export interface GetFollowUsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
