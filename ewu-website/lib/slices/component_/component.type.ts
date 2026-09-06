import { BaseAction } from "@lib/action.type";
import {
  GetComponentResponse,
  GetComponentRequest,
} from "@lib/services/component_/component.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface ComponentSliceState {
  getComponentStatus: FetchStatus;
  getComponentError?: string;
  getComponentResponse?: GetComponentResponse;
}

export interface GetComponentAction extends BaseAction {
  payload: {
    request: GetComponentRequest;
  };
}

export interface GetComponentSuccessAction extends BaseAction {
  payload: {
    response: GetComponentResponse;
  };
}

export interface GetComponentFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}