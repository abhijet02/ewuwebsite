import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  ProgramCardSliceState,
  GetProgramCardAction,
  GetProgramCardSuccessAction,
  GetProgramCardFailureAction,
} from "./programCard.type";

const initState: ProgramCardSliceState = {
  getProgramCardStatus: FetchStatus.IDLE,
  getProgramCardError: undefined,
  getProgramCardResponse: undefined,
};

const programCardSlice = createSlice({
  name: "programCard",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getProgramCard: (state, _action: GetProgramCardAction) => {
      state.getProgramCardStatus = FetchStatus.FETCHING;
      state.getProgramCardError = "";
    },
    getProgramCardSuccess: (state, action: GetProgramCardSuccessAction) => {
      state.getProgramCardStatus = FetchStatus.SUCCESS;
      state.getProgramCardResponse = action.payload.response;
    },
    getProgramCardFailure: (state, action: GetProgramCardFailureAction) => {
      state.getProgramCardStatus = FetchStatus.FAILURE;
      state.getProgramCardError = action.payload.error;
    },

    resetProgramCard: () => {
      return initState;
    },
  },
});

export const programCardActions = programCardSlice.actions;
export const programCardReducer = programCardSlice.reducer;
