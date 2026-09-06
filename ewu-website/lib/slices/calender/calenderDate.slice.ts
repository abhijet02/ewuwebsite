import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  CalenderDateSliceState,
  GetCalenderDatesAction,
  GetCalenderDatesSuccessAction,
  GetCalenderDatesFailureAction,
} from "./calenderDate.type";

const initState: CalenderDateSliceState = {
  getCalenderDatesStatus: FetchStatus.IDLE,
  getCalenderDatesError: undefined,
  getCalenderDatesResponse: undefined,
};

const calenderDateSlice = createSlice({
  name: "calenderDate",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getCalenderDates: (state, _action: GetCalenderDatesAction) => {
      state.getCalenderDatesStatus = FetchStatus.FETCHING;
      state.getCalenderDatesError = "";
    },
    getCalenderDatesSuccess: (state, action: GetCalenderDatesSuccessAction) => {
      state.getCalenderDatesStatus = FetchStatus.SUCCESS;
      state.getCalenderDatesResponse = action.payload.response;
    },
    getCalenderDatesFailure: (state, action: GetCalenderDatesFailureAction) => {
      state.getCalenderDatesStatus = FetchStatus.FAILURE;
      state.getCalenderDatesError = action.payload.error;
    },

    resetCalenderDate: () => {
      return initState;
    },
  },
});

export const calenderDateActions = calenderDateSlice.actions;

export const calenderDateReducer = calenderDateSlice.reducer;
