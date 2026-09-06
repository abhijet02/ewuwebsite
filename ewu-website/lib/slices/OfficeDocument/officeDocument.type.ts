import { BaseAction } from "@lib/action.type";
import {
  GetOfficeDocumentsResponse,
  GetOfficeDocumentsRequest,
  CreateOfficeDocumentRequest,
  UpdateOfficeDocumentRequest,
  RemoveOfficeDocumentRequest,
  OfficeDocument,
} from "@lib/services/officeDocument/officeDocument.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface OfficeDocumentSliceState {
  getOfficeDocumentsStatus: FetchStatus;
  getOfficeDocumentsError?: string;
  getOfficeDocumentsResponse?: GetOfficeDocumentsResponse;
  createOfficeDocumentStatus: FetchStatus;
  createOfficeDocumentError?: string;
  createOfficeDocumentResponse?: OfficeDocument;
  updateOfficeDocumentStatus: FetchStatus;
  updateOfficeDocumentError?: string;
  updateOfficeDocumentResponse?: OfficeDocument;
  removeOfficeDocumentStatus: FetchStatus;
  removeOfficeDocumentError?: string;
  removeOfficeDocumentResponse?: OfficeDocument;
}

export interface GetOfficeDocumentsAction extends BaseAction {
  payload: {
    request: GetOfficeDocumentsRequest;
  };
}

export interface GetOfficeDocumentsSuccessAction extends BaseAction {
  payload: {
    response: GetOfficeDocumentsResponse;
  };
}

export interface GetOfficeDocumentsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface CreateOfficeDocumentAction extends BaseAction {
  payload: {
    request: CreateOfficeDocumentRequest;
  };
}

export interface CreateOfficeDocumentSuccessAction extends BaseAction {
  payload: {
    response: OfficeDocument;
  };
}

export interface CreateOfficeDocumentFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface UpdateOfficeDocumentAction extends BaseAction {
  payload: {
    request: UpdateOfficeDocumentRequest;
  };
}

export interface UpdateOfficeDocumentSuccessAction extends BaseAction {
  payload: {
    response: OfficeDocument;
  };
}

export interface UpdateOfficeDocumentFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface RemoveOfficeDocumentAction extends BaseAction {
  payload: {
    request: RemoveOfficeDocumentRequest;
  };
}

export interface RemoveOfficeDocumentSuccessAction extends BaseAction {
  payload: {
    response: OfficeDocument;
  };
}

export interface RemoveOfficeDocumentFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
