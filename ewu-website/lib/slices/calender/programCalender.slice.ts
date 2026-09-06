import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  ProgramCalenderSliceState,
  GetProgramCalendersAction,
  GetProgramCalendersSuccessAction,
  GetProgramCalendersFailureAction,
} from "./programCalender.type";

const initState: ProgramCalenderSliceState = {
  getProgramCalendersStatus: FetchStatus.IDLE,
  getProgramCalendersError: undefined,
  getProgramCalendersResponse: undefined,
  selectedYear: 0
};

const programCalenderSlice = createSlice({
  name: "programCalender",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getProgramCalenders: (state, _action: GetProgramCalendersAction) => {
      state.getProgramCalendersStatus = FetchStatus.FETCHING;
      state.getProgramCalendersError = "";
    },
    getProgramCalendersSuccess: (
      state,
      action: GetProgramCalendersSuccessAction
    ) => {
      state.getProgramCalendersStatus = FetchStatus.SUCCESS;
      state.getProgramCalendersResponse = action.payload.response;
    },
    getProgramCalendersFailure: (
      state,
      action: GetProgramCalendersFailureAction
    ) => {
      state.getProgramCalendersStatus = FetchStatus.FAILURE;
      state.getProgramCalendersError = action.payload.error;
    },

    setSelectedYear: (state, action: PayloadAction<number>) => {
      state.selectedYear = action.payload
    },

    resetProgramCalender: () => {
      return initState;
    },
  },
});

export const programCalenderActions = programCalenderSlice.actions;

export const programCalenderReducer = programCalenderSlice.reducer;
