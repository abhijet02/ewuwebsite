import { BaseAction } from "@lib/action.type";
import {
  GetClubsResponse,
  GetClubsRequest,
} from "@lib/services/club/club.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface ClubSliceState {
  getClubsStatus: FetchStatus;
  getClubsError?: string;
  getClubsResponse?: GetClubsResponse;
}

export interface GetClubsAction extends BaseAction {
  payload: {
    request: GetClubsRequest;
  };
}

export interface GetClubsSuccessAction extends BaseAction {
  payload: {
    response: GetClubsResponse;
  };
}

export interface GetClubsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
