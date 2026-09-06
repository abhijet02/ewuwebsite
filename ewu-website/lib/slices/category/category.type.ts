import { BaseAction } from "@lib/action.type";
import {
  GetCategoriesResponse,
  GetCategoriesRequest,
} from "@lib/services/category/category.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface CategorySliceState {
  getCategoriesStatus: FetchStatus;
  getCategoriesError?: string;
  getCategoriesResponse?: GetCategoriesResponse;
}

export interface GetCategoriesAction extends BaseAction {
  payload: {
    request: GetCategoriesRequest;
  };
}

export interface GetCategoriesSuccessAction extends BaseAction {
  payload: {
    response: GetCategoriesResponse;
  };
}

export interface GetCategoriesFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
