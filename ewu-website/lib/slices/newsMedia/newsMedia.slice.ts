import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  NewsMediaSliceState,
  GetNewsMediaAction,
  GetNewsMediaSuccessAction,
  GetNewsMediaFailureAction,
} from "./newsMedia.type";

const initState: NewsMediaSliceState = {
  getNewsMediaStatus: FetchStatus.IDLE,
  getNewsMediaError: undefined,
  getNewsMediaResponse: undefined,
};

const newsMediaSlice = createSlice({
  name: "newsMedia",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getNewsMedia: (state, _action: GetNewsMediaAction) => {
      state.getNewsMediaStatus = FetchStatus.FETCHING;
      state.getNewsMediaError = "";
    },
    getNewsMediaSuccess: (state, action: GetNewsMediaSuccessAction) => {
      state.getNewsMediaStatus = FetchStatus.SUCCESS;
      state.getNewsMediaResponse = action.payload.response;
    },
    getNewsMediaFailure: (state, action: GetNewsMediaFailureAction) => {
      state.getNewsMediaStatus = FetchStatus.FAILURE;
      state.getNewsMediaError = action.payload.error;
    },

    resetNewsMedia: () => {
      return initState;
    },
  },
});

export const newsMediaActions = newsMediaSlice.actions;
export const newsMediaReducer = newsMediaSlice.reducer;
