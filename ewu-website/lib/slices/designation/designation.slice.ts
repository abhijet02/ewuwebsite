import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@/lib/services/fetch.type";
import {
  DesignationSliceState,
  GetDesignationsAction,
  GetDesignationsSuccessAction,
  GetDesignationsFailureAction,
} from "./designation.type";

const initState: DesignationSliceState = {
  getDesignationsStatus: FetchStatus.IDLE,
  getDesignationsError: undefined,
  getDesignationsResponse: undefined,
};

const designationSlice = createSlice({
  name: "designation",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getDesignations: (state, _action: GetDesignationsAction) => {
      state.getDesignationsStatus = FetchStatus.FETCHING;
      state.getDesignationsError = "";
    },
    getDesignationsSuccess: (state, action: GetDesignationsSuccessAction) => {
      state.getDesignationsStatus = FetchStatus.SUCCESS;
      state.getDesignationsResponse = action.payload.response;
    },
    getDesignationsFailure: (state, action: GetDesignationsFailureAction) => {
      state.getDesignationsStatus = FetchStatus.FAILURE;
      state.getDesignationsError = action.payload.error;
    },

    resetDesignation: () => {
      return initState;
    },
  },
});

export const designationActions = designationSlice.actions;

export const designationReducer = designationSlice.reducer;
