import { BaseAction } from "@lib/action.type";
import {
  GetCampusLifesResponse,
  GetCampusLifesRequest,
} from "@lib/services/campusLife/campusLife.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface CampusLifeSliceState {
  getCampusLifesStatus: FetchStatus;
  getCampusLifesError?: string;
  getCampusLifesResponse?: GetCampusLifesResponse;
}

export interface GetCampusLifesAction extends BaseAction {
  payload: {
    request: GetCampusLifesRequest;
  };
}

export interface GetCampusLifesSuccessAction extends BaseAction {
  payload: {
    response: GetCampusLifesResponse;
  };
}

export interface GetCampusLifesFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
