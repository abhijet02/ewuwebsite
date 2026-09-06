import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  NewsMediaOrgSliceState,
  GetNewsMediaOrgAction,
  GetNewsMediaOrgSuccessAction,
  GetNewsMediaOrgFailureAction,
} from "./newsMediaOrg.type";

const initState: NewsMediaOrgSliceState = {
  getNewsMediaOrgStatus: FetchStatus.IDLE,
  getNewsMediaOrgError: undefined,
  getNewsMediaOrgResponse: undefined,
};

const newsMediaOrgSlice = createSlice({
  name: "newsMediaOrg",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getNewsMediaOrg: (state, _action: GetNewsMediaOrgAction) => {
      state.getNewsMediaOrgStatus = FetchStatus.FETCHING;
      state.getNewsMediaOrgError = "";
    },
    getNewsMediaOrgSuccess: (state, action: GetNewsMediaOrgSuccessAction) => {
      state.getNewsMediaOrgStatus = FetchStatus.SUCCESS;
      state.getNewsMediaOrgResponse = action.payload.response;
    },
    getNewsMediaOrgFailure: (state, action: GetNewsMediaOrgFailureAction) => {
      state.getNewsMediaOrgStatus = FetchStatus.FAILURE;
      state.getNewsMediaOrgError = action.payload.error;
    },

    resetNewsMediaOrg: () => {
      return initState;
    },
  },
});

export const newsMediaOrgActions = newsMediaOrgSlice.actions;
export const newsMediaOrgReducer = newsMediaOrgSlice.reducer;
