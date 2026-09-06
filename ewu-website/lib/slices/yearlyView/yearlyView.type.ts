import { BaseAction } from "@lib/action.type";
import {
  GetYearlyViewsResponse,
  GetYearlyViewsRequest,
} from "@lib/services/yearlyView/yearlyView.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface YearlyViewSliceState {
  getYearlyViewsStatus: FetchStatus;
  getYearlyViewsError?: string;
  getYearlyViewsResponse?: GetYearlyViewsResponse;
}

export interface GetYearlyViewsAction extends BaseAction {
  payload: {
    request: GetYearlyViewsRequest;
  };
}

export interface GetYearlyViewsSuccessAction extends BaseAction {
  payload: {
    response: GetYearlyViewsResponse;
  };
}

export interface GetYearlyViewsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}




