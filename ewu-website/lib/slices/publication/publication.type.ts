import { BaseAction } from "@lib/action.type";
import {
  GetPublicationsResponse,
  GetPublicationsRequest,
} from "@lib/services/publication/publication.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface PublicationSliceState {
  getPublicationsStatus: FetchStatus;
  getPublicationsError?: string;
  getPublicationsResponse?: GetPublicationsResponse;
}

export interface GetPublicationsAction extends BaseAction {
  payload: {
    request: GetPublicationsRequest;
  };
}

export interface GetPublicationsSuccessAction extends BaseAction {
  payload: {
    response: GetPublicationsResponse;
  };
}

export interface GetPublicationsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
