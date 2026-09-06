import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  FacultyMemberDocumentSliceState,
  GetFacultyMemberDocumentsAction,
  GetFacultyMemberDocumentsFailureAction,
  GetFacultyMemberDocumentsSuccessAction,
} from "./facultyMemberDocument.type";

const initState: FacultyMemberDocumentSliceState = {
  getFacultyMemberDocumentsStatus: FetchStatus.IDLE,
  getFacultyMemberDocumentsError: undefined,
  getFacultyMemberDocumentsResponse: undefined,
};

const facultyMemberDocumentSlice = createSlice({
  name: "facultyMemberDocument",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getFacultyMemberDocuments: (
      state,
      _action: GetFacultyMemberDocumentsAction
    ) => {
      state.getFacultyMemberDocumentsStatus = FetchStatus.FETCHING;
      state.getFacultyMemberDocumentsError = "";
    },
    getFacultyMemberDocumentsSuccess: (
      state,
      action: GetFacultyMemberDocumentsSuccessAction
    ) => {
      state.getFacultyMemberDocumentsStatus = FetchStatus.SUCCESS;
      state.getFacultyMemberDocumentsResponse = action.payload.response;
    },
    getFacultyMemberDocumentsFailure: (
      state,
      action: GetFacultyMemberDocumentsFailureAction
    ) => {
      state.getFacultyMemberDocumentsStatus = FetchStatus.FAILURE;
      state.getFacultyMemberDocumentsError = action.payload.error;
    },

    resetFacultyMemberDocument: () => {
      return initState;
    },
  },
});

export const facultyMemberDocumentActions = facultyMemberDocumentSlice.actions;
export const facultyMemberDocumentReducer = facultyMemberDocumentSlice.reducer;
