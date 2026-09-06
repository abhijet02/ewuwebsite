import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@/lib/services/fetch.type";
import {
  PageSliceState,
  GetPagesAction,
  GetPagesFailureAction,
  GetPagesSuccessAction,
  GetPageByLinkAction,
  GetPageByLinkFailureAction,
  GetPageByLinkSuccessAction,
} from "./page.type";

const initState: PageSliceState = {
  getPagesStatus: FetchStatus.IDLE,
  getPagesError: undefined,
  getPagesResponse: undefined,
  getPageByLinkStatus: FetchStatus.IDLE,
  getPageByLinkError: undefined,
    getPageByLinkResponse: undefined,
};

const pageSlice = createSlice({
  name: "page",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getPages: (state, _action: GetPagesAction) => {
      state.getPagesStatus = FetchStatus.FETCHING;
      state.getPagesError = "";
    },
    getPagesSuccess: (state, action: GetPagesSuccessAction) => {
      state.getPagesStatus = FetchStatus.SUCCESS;
      state.getPagesResponse = action.payload.response;
    },
    getPagesFailure: (state, action: GetPagesFailureAction) => {
      state.getPagesStatus = FetchStatus.FAILURE;
      state.getPagesError = action.payload.error;
    },

    getPageByLink: (state, _action: GetPageByLinkAction) => {
      state.getPageByLinkStatus = FetchStatus.FETCHING;
      state.getPageByLinkError = "";
    },
    getPageByLinkSuccess: (state, action: GetPageByLinkSuccessAction ) => {
      state.getPageByLinkStatus = FetchStatus.SUCCESS;
      state.getPageByLinkResponse = action.payload.response;
    },
    getPageByLinkFailure: (state, action: GetPageByLinkFailureAction) => {
      state.getPageByLinkStatus = FetchStatus.FAILURE;
      state.getPageByLinkError = action.payload.error;
    },

    resetPage: () => {
      return initState;
    },
  },
});

export const pageActions = pageSlice.actions;
export const pageReducer = pageSlice.reducer;
