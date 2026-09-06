import { BaseAction } from "@lib/action.type";
import {
  GetOfficeMemberDocumentsResponse,
  GetOfficeMemberDocumentsRequest,
} from "@lib/services/officeMemberDocument/officeMemberDocument.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface OfficeMemberDocumentSliceState {
  getOfficeMemberDocumentsStatus: FetchStatus;
  getOfficeMemberDocumentsError?: string;
  getOfficeMemberDocumentsResponse?: GetOfficeMemberDocumentsResponse;
}

export interface GetOfficeMemberDocumentsAction extends BaseAction {
  payload: {
    request: GetOfficeMemberDocumentsRequest;
  };
}

export interface GetOfficeMemberDocumentsSuccessAction extends BaseAction {
  payload: {
    response: GetOfficeMemberDocumentsResponse;
  };
}

export interface GetOfficeMemberDocumentsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
