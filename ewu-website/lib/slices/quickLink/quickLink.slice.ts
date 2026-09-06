import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@/lib/services/fetch.type";
import {
  QuickLinkSliceState,
  GetQuickLinkAction,
  GetQuickLinkFailureAction,
  GetQuickLinkSuccessAction,
} from "./quickLink.type";

const initState: QuickLinkSliceState = {
  getQuickLinkStatus: FetchStatus.IDLE,
  getQuickLinkError: undefined,
  getQuickLinkResponse: undefined,
};

const quickLinkSlice = createSlice({
  name: "quickLink",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getQuickLink: (state, _action: GetQuickLinkAction) => {
      state.getQuickLinkStatus = FetchStatus.FETCHING;
      state.getQuickLinkError = "";
    },
    getQuickLinkSuccess: (state, action: GetQuickLinkSuccessAction) => {
      state.getQuickLinkStatus = FetchStatus.SUCCESS;
      state.getQuickLinkResponse = action.payload.response;
    },
    getQuickLinkFailure: (state, action: GetQuickLinkFailureAction) => {
      state.getQuickLinkStatus = FetchStatus.FAILURE;
      state.getQuickLinkError = action.payload.error;
    },

    resetQuickLink: () => {
      return initState;
    },
  },
});

export const quickLinkActions = quickLinkSlice.actions;

export const quickLinkReducer = quickLinkSlice.reducer;
