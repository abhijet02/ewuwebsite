import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  PoeSliceState,
  GetPoesAction,
  GetPoesFailureAction,
  GetPoesSuccessAction,
} from "./poe.type";

const initState: PoeSliceState = {
  getPoesStatus: FetchStatus.IDLE,
  getPoesError: undefined,
  getPoesResponse: undefined,
};

const poeSlice = createSlice({
  name: "poe",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getPoes: (state, _action: GetPoesAction) => {
      state.getPoesStatus = FetchStatus.FETCHING;
      state.getPoesError = "";
    },
    getPoesSuccess: (state, action: GetPoesSuccessAction) => {
      state.getPoesStatus = FetchStatus.SUCCESS;
      state.getPoesResponse = action.payload.response;
    },
    getPoesFailure: (state, action: GetPoesFailureAction) => {
      state.getPoesStatus = FetchStatus.FAILURE;
      state.getPoesError = action.payload.error;
    },

    resetPoe: () => {
      return initState;
    },
  },
});

export const poeActions = poeSlice.actions;
export const poeReducer = poeSlice.reducer;
