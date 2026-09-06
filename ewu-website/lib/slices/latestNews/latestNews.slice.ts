import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@/lib/services/fetch.type";
import {
  LatestNewsSliceState,
  GetLatestNewsAction,
  GetLatestNewsFailureAction,
  GetLatestNewsSuccessAction,
} from "./latestNews.type";

const initState: LatestNewsSliceState = {
  getLatestNewsStatus: FetchStatus.IDLE,
  getLatestNewsError: undefined,
  getLatestNewsResponse: undefined,
};

const latestNewsSlice = createSlice({
  name: "latestNews",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getLatestNews: (state, _action: GetLatestNewsAction) => {
      state.getLatestNewsStatus = FetchStatus.FETCHING;
      state.getLatestNewsError = "";
    },
    getLatestNewsSuccess: (state, action: GetLatestNewsSuccessAction) => {
      state.getLatestNewsStatus = FetchStatus.SUCCESS;
      state.getLatestNewsResponse = action.payload.response;
    },
    getLatestNewsFailure: (state, action: GetLatestNewsFailureAction) => {
      state.getLatestNewsStatus = FetchStatus.FAILURE;
      state.getLatestNewsError = action.payload.error;
    },

    resetLatestNews: () => {
      return initState;
    },
  },
});

export const latestNewsActions = latestNewsSlice.actions;

export const latestNewsReducer = latestNewsSlice.reducer;
