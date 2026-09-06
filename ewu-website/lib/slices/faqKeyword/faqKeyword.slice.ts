import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  FaqKeywordSliceState,
  GetFaqKeywordAction,
  GetFaqKeywordFailureAction,
  GetFaqKeywordSuccessAction,
} from "./faqKeyword.type";

const initState: FaqKeywordSliceState = {
  getFaqKeywordStatus: FetchStatus.IDLE,
  getFaqKeywordError: undefined,
  getFaqKeywordResponse: undefined,
};

const faqKeywordSlice = createSlice({
  name: "faqKeyword",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getFaqKeyword: (state, _action: GetFaqKeywordAction) => {
      state.getFaqKeywordStatus = FetchStatus.FETCHING;
      state.getFaqKeywordError = "";
    },
    getFaqKeywordSuccess: (state, action: GetFaqKeywordSuccessAction) => {
      state.getFaqKeywordStatus = FetchStatus.SUCCESS;
      state.getFaqKeywordResponse = action.payload.response;
    },
    getFaqKeywordFailure: (state, action: GetFaqKeywordFailureAction) => {
      state.getFaqKeywordStatus = FetchStatus.FAILURE;
      state.getFaqKeywordError = action.payload.error;
    },

    resetFaqKeyword: () => {
      return initState;
    },
  },
});

export const faqKeywordActions = faqKeywordSlice.actions;

export const faqKeywordReducer = faqKeywordSlice.reducer;
