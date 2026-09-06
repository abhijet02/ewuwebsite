import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@/lib/services/fetch.type";
import {
  QuoteSliceState,
  GetQuotesAction,
  GetQuotesSuccessAction,
  GetQuotesFailureAction,
} from "./quote.type";

const initState: QuoteSliceState = {
  getQuotesStatus: FetchStatus.IDLE,
  getQuotesError: undefined,
  getQuotesResponse: undefined,
};

const quoteSlice = createSlice({
  name: "quote",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getQuotes: (state, _action: GetQuotesAction) => {
      state.getQuotesStatus = FetchStatus.FETCHING;
      state.getQuotesError = "";
    },
    getQuotesSuccess: (state, action: GetQuotesSuccessAction) => {
      state.getQuotesStatus = FetchStatus.SUCCESS;
      state.getQuotesResponse = action.payload.response;
    },
    getQuotesFailure: (state, action: GetQuotesFailureAction) => {
      state.getQuotesStatus = FetchStatus.FAILURE;
      state.getQuotesError = action.payload.error;
    },

    resetQuote: () => {
      return initState;
    },
  },
});

export const quoteActions = quoteSlice.actions;

export const quoteReducer = quoteSlice.reducer;
