import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  FaqSliceState,
  GetFaqAction,
  GetFaqFailureAction,
  GetFaqSuccessAction,
} from "./faq.type";

const initState: FaqSliceState = {
  getFaqStatus: FetchStatus.IDLE,
  getFaqError: undefined,
  getFaqResponse: undefined,
};

const faqSlice = createSlice({
  name: "faq",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getFaq: (state, _action: GetFaqAction) => {
      state.getFaqStatus = FetchStatus.FETCHING;
      state.getFaqError = "";
    },
    getFaqSuccess: (state, action: GetFaqSuccessAction) => {
      state.getFaqStatus = FetchStatus.SUCCESS;
      state.getFaqResponse = action.payload.response;
    },
    getFaqFailure: (state, action: GetFaqFailureAction) => {
      state.getFaqStatus = FetchStatus.FAILURE;
      state.getFaqError = action.payload.error;
    },

    resetFaq: () => {
      return initState;
    },
  },
});

export const faqActions = faqSlice.actions;

export const faqReducer = faqSlice.reducer;
