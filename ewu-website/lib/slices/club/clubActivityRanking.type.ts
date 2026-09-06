import { BaseAction } from "@lib/action.type";
import {
  GetClubActivityRankingsResponse,
  GetClubActivityRankingsRequest,
} from "@lib/services/club/clubActivityRanking.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface ClubActivityRankingSliceState {
  getClubActivityRankingsStatus: FetchStatus;
  getClubActivityRankingsError?: string;
  getClubActivityRankingsResponse?: GetClubActivityRankingsResponse;
}

export interface GetClubActivityRankingsAction extends BaseAction {
  payload: {
    request: GetClubActivityRankingsRequest;
  };
}

export interface GetClubActivityRankingsSuccessAction extends BaseAction {
  payload: {
    response: GetClubActivityRankingsResponse;
  };
}

export interface GetClubActivityRankingsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
