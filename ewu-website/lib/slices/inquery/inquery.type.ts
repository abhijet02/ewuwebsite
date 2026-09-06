import { BaseAction } from "@lib/action.type";
import {
  Inquery,
  GetInquerysRequest,
  GetInquerysResponse,
  CreateInqueryRequest,
  UpdateInqueryRequest,
  RemoveInqueryRequest,
} from "@lib/services/inquery/inquery.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface InquerySliceState {
  getInquerysStatus: FetchStatus;
  getInquerysError?: string;
  getInquerysResponse?: GetInquerysResponse;
  createInqueryStatus: FetchStatus;
  createInqueryError?: string;
  createInqueryResponse?: Inquery;
  updateInqueryStatus: FetchStatus;
  updateInqueryError?: string;
  updateInqueryResponse?: Inquery;
  removeInqueryStatus: FetchStatus;
  removeInqueryError?: string;
  removeInqueryResponse?: Inquery;
}

export interface GetInquerysAction extends BaseAction {
  payload: {
    request: GetInquerysRequest;
  };
}

export interface GetInquerysSuccessAction extends BaseAction {
  payload: {
    response: GetInquerysResponse;
  };
}

export interface GetInquerysFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface CreateInqueryAction extends BaseAction {
  payload: {
    request: CreateInqueryRequest;
  };
}

export interface CreateInquerySuccessAction extends BaseAction {
  payload: {
    response: Inquery;
  };
}

export interface CreateInqueryFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface UpdateInqueryAction extends BaseAction {
  payload: {
    request: UpdateInqueryRequest;
  };
}

export interface UpdateInquerySuccessAction extends BaseAction {
  payload: {
    response: Inquery;
  };
}

export interface UpdateInqueryFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface RemoveInqueryAction extends BaseAction {
  payload: {
    request: RemoveInqueryRequest;
  };
}

export interface RemoveInquerySuccessAction extends BaseAction {
  payload: {
    response: Inquery;
  };
}

export interface RemoveInqueryFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
