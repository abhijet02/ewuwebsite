import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  OfficeMemberDocumentSliceState,
  GetOfficeMemberDocumentsAction,
  GetOfficeMemberDocumentsFailureAction,
  GetOfficeMemberDocumentsSuccessAction,
} from "./officeMemberDocument.type";

const initState: OfficeMemberDocumentSliceState = {
  getOfficeMemberDocumentsStatus: FetchStatus.IDLE,
  getOfficeMemberDocumentsError: undefined,
  getOfficeMemberDocumentsResponse: undefined,
};

const officeMemberDocumentSlice = createSlice({
  name: "officeMemberDocument",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getOfficeMemberDocuments: (
      state,
      _action: GetOfficeMemberDocumentsAction
    ) => {
      state.getOfficeMemberDocumentsStatus = FetchStatus.FETCHING;
      state.getOfficeMemberDocumentsError = "";
    },
    getOfficeMemberDocumentsSuccess: (
      state,
      action: GetOfficeMemberDocumentsSuccessAction
    ) => {
      state.getOfficeMemberDocumentsStatus = FetchStatus.SUCCESS;
      state.getOfficeMemberDocumentsResponse = action.payload.response;
    },
    getOfficeMemberDocumentsFailure: (
      state,
      action: GetOfficeMemberDocumentsFailureAction
    ) => {
      state.getOfficeMemberDocumentsStatus = FetchStatus.FAILURE;
      state.getOfficeMemberDocumentsError = action.payload.error;
    },

    resetOfficeMemberDocument: () => {
      return initState;
    },
  },
});

export const officeMemberDocumentActions = officeMemberDocumentSlice.actions;
export const officeMemberDocumentReducer = officeMemberDocumentSlice.reducer;
