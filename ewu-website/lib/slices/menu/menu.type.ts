import { BaseAction } from "@/lib/action.type";
import {
  GetMenusResponse,
  GetMenusRequest,
  GetMenusWithPageIdZeroResponse,
} from "@/lib/services/menu/menu.service.type";
import { FetchStatus } from "@/lib/services/fetch.type";

export interface MenuSliceState {
  getMenusStatus: FetchStatus;
  getMenusError?: string;
  getMenusResponse?: GetMenusResponse;
  getMenusWithPageIdZeroStatus: FetchStatus,
  getMenusWithPageIdZeroError: string,
  getMenusWithPageIdZeroResponse: GetMenusWithPageIdZeroResponse,
}

export interface GetMenusAction extends BaseAction {
  payload: {
    request: GetMenusRequest;
  };
}

export interface GetMenusSuccessAction extends BaseAction {
  payload: {
    response: GetMenusResponse;
  };
}

export interface GetMenusFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface GetMenusWithPageIdZeroSuccessAction extends BaseAction {
  payload: {
    response: GetMenusWithPageIdZeroResponse;
  };
}

export interface GetMenusWithPageIdZeroFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
