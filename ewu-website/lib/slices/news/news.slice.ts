import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  NewsSliceState,
  GetNewsAction,
  GetNewsSuccessAction,
  GetNewsFailureAction,
  GetNewsBySlugSuccessAction,
  GetNewsBySlugAction,
  GetNewsBySlugFailureAction,
} from "./news.type";

const initState: NewsSliceState = {
  getNewsStatus: FetchStatus.IDLE,
  getNewsError: undefined,
  getNewsResponse: undefined,
  getNewsBySlugStatus: FetchStatus.IDLE,
  getNewsBySlugError: undefined,
  getNewsBySlugResponse: undefined,
};

const newsSlice = createSlice({
  name: "news",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getNews: (state, _action: GetNewsAction) => {
      state.getNewsStatus = FetchStatus.FETCHING;
      state.getNewsError = "";
    },
    getNewsSuccess: (state, action: GetNewsSuccessAction) => {
      state.getNewsStatus = FetchStatus.SUCCESS;
      state.getNewsResponse = action.payload.response;
    },
    getNewsFailure: (state, action: GetNewsFailureAction) => {
      state.getNewsStatus = FetchStatus.FAILURE;
      state.getNewsError = action.payload.error;
    },

    getNewsBySlug: (state, _action: GetNewsBySlugAction) => {
      state.getNewsBySlugStatus = FetchStatus.FETCHING;
      state.getNewsBySlugError = "";
    },
    getNewsBySlugSuccess: (state, action: GetNewsBySlugSuccessAction) => {
      state.getNewsBySlugStatus = FetchStatus.SUCCESS;
      state.getNewsBySlugResponse = action.payload.response;
    },
    getNewsBySlugFailure: (state, action: GetNewsBySlugFailureAction) => {
      state.getNewsBySlugStatus = FetchStatus.FAILURE;
      state.getNewsBySlugError = action.payload.error;
    },  

    resetNews: () => {
      return initState;
    },
  },
});

export const newsActions = newsSlice.actions;

export const newsReducer = newsSlice.reducer;
