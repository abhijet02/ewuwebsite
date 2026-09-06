import { BaseAction } from "@lib/action.type";
import {
  GetFacultyMemberDocumentsResponse,
  GetFacultyMemberDocumentsRequest,
} from "@lib/services/facultyMemberDocument/facultyMemberDocument.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface FacultyMemberDocumentSliceState {
  getFacultyMemberDocumentsStatus: FetchStatus;
  getFacultyMemberDocumentsError?: string;
  getFacultyMemberDocumentsResponse?: GetFacultyMemberDocumentsResponse;
}

export interface GetFacultyMemberDocumentsAction extends BaseAction {
  payload: {
    request: GetFacultyMemberDocumentsRequest;
  };
}

export interface GetFacultyMemberDocumentsSuccessAction extends BaseAction {
  payload: {
    response: GetFacultyMemberDocumentsResponse;
  };
}

export interface GetFacultyMemberDocumentsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
