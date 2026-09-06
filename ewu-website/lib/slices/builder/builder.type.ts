import { BaseAction } from "@lib/action.type";
import {
  GetBuildersResponse,
  GetBuildersRequest,
} from "@lib/services/builder/builder.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface BuilderSliceState {
  getBuildersStatus: FetchStatus;
  getBuildersError?: string;
  getBuildersResponse?: GetBuildersResponse;
}

export interface GetBuildersAction extends BaseAction {
  payload: {
    request: GetBuildersRequest;
  };
}

export interface GetBuildersSuccessAction extends BaseAction {
  payload: {
    response: GetBuildersResponse;
  };
}

export interface GetBuildersFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}