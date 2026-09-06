import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  HeaderSliceState,
  GetHeadersAction,
  GetHeadersFailureAction,
  GetHeadersSuccessAction,
} from "./header.type";

const initState: HeaderSliceState = {
  getHeadersStatus: FetchStatus.IDLE,
  getHeadersError: undefined,
  getHeadersResponse: undefined,
};

const headerSlice = createSlice({
  name: "header",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getHeaders: (state, _action: GetHeadersAction) => {
      state.getHeadersStatus = FetchStatus.FETCHING;
      state.getHeadersError = "";
    },
    getHeadersSuccess: (state, action: GetHeadersSuccessAction) => {
      state.getHeadersStatus = FetchStatus.SUCCESS;
      state.getHeadersResponse = action.payload.response;
    },
    getHeadersFailure: (state, action: GetHeadersFailureAction) => {
      state.getHeadersStatus = FetchStatus.FAILURE;
      state.getHeadersError = action.payload.error;
    },

    resetHeader: () => {
      return initState;
    },
  },
});

export const headerActions = headerSlice.actions;
export const headerReducer = headerSlice.reducer;
