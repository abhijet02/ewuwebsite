import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  AdmissionResultSliceState,
  GetAdmissionResultsAction,
  GetAdmissionResultsFailureAction,
  GetAdmissionResultsSuccessAction,
} from "./admissionResult.type";

const initState: AdmissionResultSliceState = {
  getAdmissionResultsStatus: FetchStatus.IDLE,
  getAdmissionResultsError: undefined,
  getAdmissionResultsResponse: undefined,
};

const admissionResultSlice = createSlice({
  name: "admissionResult",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getAdmissionResults: (state, _action: GetAdmissionResultsAction) => {
      state.getAdmissionResultsStatus = FetchStatus.FETCHING;
      state.getAdmissionResultsError = "";
    },
    getAdmissionResultsSuccess: (
      state,
      action: GetAdmissionResultsSuccessAction
    ) => {
      state.getAdmissionResultsStatus = FetchStatus.SUCCESS;
      state.getAdmissionResultsResponse = action.payload.response;
    },
    getAdmissionResultsFailure: (
      state,
      action: GetAdmissionResultsFailureAction
    ) => {
      state.getAdmissionResultsStatus = FetchStatus.FAILURE;
      state.getAdmissionResultsError = action.payload.error;
    },

    resetAdmissionResult: () => {
      return initState;
    },
  },
});

export const admissionResultActions = admissionResultSlice.actions;
export const admissionResultReducer = admissionResultSlice.reducer;
