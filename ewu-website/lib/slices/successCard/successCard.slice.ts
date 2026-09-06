import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  SuccessCardSliceState,
  GetSuccessCardAction,
  GetSuccessCardSuccessAction,
  GetSuccessCardFailureAction,
} from "./successCard.type";

const initState: SuccessCardSliceState = {
  getSuccessCardStatus: FetchStatus.IDLE,
  getSuccessCardError: undefined,
  getSuccessCardResponse: undefined,
};

const successCardSlice = createSlice({
  name: "successCard",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getSuccessCard: (state, _action: GetSuccessCardAction) => {
      state.getSuccessCardStatus = FetchStatus.FETCHING;
      state.getSuccessCardError = "";
    },
    getSuccessCardSuccess: (state, action: GetSuccessCardSuccessAction) => {
      state.getSuccessCardStatus = FetchStatus.SUCCESS;
      state.getSuccessCardResponse = action.payload.response;
    },
    getSuccessCardFailure: (state, action: GetSuccessCardFailureAction) => {
      state.getSuccessCardStatus = FetchStatus.FAILURE;
      state.getSuccessCardError = action.payload.error;
    },

    resetSuccessCard: () => {
      return initState;
    },
  },
});

export const successCardActions = successCardSlice.actions;
export const successCardReducer = successCardSlice.reducer;
