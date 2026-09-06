import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  OfficeDocumentSliceState,
  CreateOfficeDocumentAction,
  CreateOfficeDocumentFailureAction,
  CreateOfficeDocumentSuccessAction,
  RemoveOfficeDocumentAction,
  RemoveOfficeDocumentFailureAction,
  RemoveOfficeDocumentSuccessAction,
  UpdateOfficeDocumentAction,
  UpdateOfficeDocumentFailureAction,
  UpdateOfficeDocumentSuccessAction,
  GetOfficeDocumentsAction,
  GetOfficeDocumentsFailureAction,
  GetOfficeDocumentsSuccessAction,
} from "./officeDocument.type";

const initState: OfficeDocumentSliceState = {
  getOfficeDocumentsStatus: FetchStatus.IDLE,
  getOfficeDocumentsError: undefined,
  getOfficeDocumentsResponse: undefined,
  createOfficeDocumentStatus: FetchStatus.IDLE,
  createOfficeDocumentError: undefined,
  createOfficeDocumentResponse: undefined,
  updateOfficeDocumentStatus: FetchStatus.IDLE,
  updateOfficeDocumentError: undefined,
  updateOfficeDocumentResponse: undefined,
  removeOfficeDocumentStatus: FetchStatus.IDLE,
  removeOfficeDocumentError: undefined,
  removeOfficeDocumentResponse: undefined,
};

const officeDocumentSlice = createSlice({
  name: "officeDocument",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getOfficeDocuments: (state, _action: GetOfficeDocumentsAction) => {
      state.getOfficeDocumentsStatus = FetchStatus.FETCHING;
      state.getOfficeDocumentsError = "";
    },
    getOfficeDocumentsSuccess: (
      state,
      action: GetOfficeDocumentsSuccessAction,
    ) => {
      state.getOfficeDocumentsStatus = FetchStatus.SUCCESS;
      state.getOfficeDocumentsResponse = action.payload.response;
    },
    getOfficeDocumentsFailure: (
      state,
      action: GetOfficeDocumentsFailureAction,
    ) => {
      state.getOfficeDocumentsStatus = FetchStatus.FAILURE;
      state.getOfficeDocumentsError = action.payload.error;
    },

    createOfficeDocument: (state, _action: CreateOfficeDocumentAction) => {
      state.createOfficeDocumentStatus = FetchStatus.FETCHING;
      state.createOfficeDocumentError = "";
    },
    createOfficeDocumentSuccess: (
      state,
      action: CreateOfficeDocumentSuccessAction,
    ) => {
      state.createOfficeDocumentStatus = FetchStatus.SUCCESS;
      state.createOfficeDocumentResponse = action.payload.response;
    },
    createOfficeDocumentFailure: (
      state,
      action: CreateOfficeDocumentFailureAction,
    ) => {
      state.createOfficeDocumentStatus = FetchStatus.FAILURE;
      state.createOfficeDocumentError = action.payload.error;
    },

    updateOfficeDocument: (state, _action: UpdateOfficeDocumentAction) => {
      state.updateOfficeDocumentStatus = FetchStatus.FETCHING;
      state.updateOfficeDocumentError = "";
    },
    updateOfficeDocumentSuccess: (
      state,
      action: UpdateOfficeDocumentSuccessAction,
    ) => {
      state.updateOfficeDocumentStatus = FetchStatus.SUCCESS;
      state.updateOfficeDocumentResponse = action.payload.response;
    },
    updateOfficeDocumentFailure: (
      state,
      action: UpdateOfficeDocumentFailureAction,
    ) => {
      state.updateOfficeDocumentStatus = FetchStatus.FAILURE;
      state.updateOfficeDocumentError = action.payload.error;
    },

    removeOfficeDocument: (state, _action: RemoveOfficeDocumentAction) => {
      state.removeOfficeDocumentStatus = FetchStatus.FETCHING;
      state.removeOfficeDocumentError = "";
    },
    removeOfficeDocumentSuccess: (
      state,
      action: RemoveOfficeDocumentSuccessAction,
    ) => {
      state.removeOfficeDocumentStatus = FetchStatus.SUCCESS;
      state.removeOfficeDocumentResponse = action.payload.response;
    },
    removeOfficeDocumentFailure: (
      state,
      action: RemoveOfficeDocumentFailureAction,
    ) => {
      state.removeOfficeDocumentStatus = FetchStatus.FAILURE;
      state.removeOfficeDocumentError = action.payload.error;
    },

    resetOfficeDocument: () => {
      return initState;
    },
  },
});

export const officeDocumentActions = officeDocumentSlice.actions;
export const officeDocumentReducer = officeDocumentSlice.reducer;
