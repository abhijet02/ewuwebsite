import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  SemesterCalenderSliceState,
  GetSemesterCalendersAction,
  GetSemesterCalendersSuccessAction,
  GetSemesterCalendersFailureAction,
} from "./semesterCalender.type";

const initState: SemesterCalenderSliceState = {
  getSemesterCalendersStatus: FetchStatus.IDLE,
  getSemesterCalendersError: undefined,
  getSemesterCalendersResponse: undefined,
  selectedSemeserId: 0
};

const semesterCalenderSlice = createSlice({
  name: "semesterCalender",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getSemesterCalenders: (state, _action: GetSemesterCalendersAction) => {
      state.getSemesterCalendersStatus = FetchStatus.FETCHING;
      state.getSemesterCalendersError = "";
    },
    getSemesterCalendersSuccess: (
      state,
      action: GetSemesterCalendersSuccessAction
    ) => {
      state.getSemesterCalendersStatus = FetchStatus.SUCCESS;
      state.getSemesterCalendersResponse = action.payload.response;
    },
    getSemesterCalendersFailure: (
      state,
      action: GetSemesterCalendersFailureAction
    ) => {
      state.getSemesterCalendersStatus = FetchStatus.FAILURE;
      state.getSemesterCalendersError = action.payload.error;
    },

    setSelectedSemeserId: (state, action: PayloadAction<number>) => {
      state.selectedSemeserId = action.payload;
    },

    resetSemesterCalender: () => {
      return initState;
    },
  },
});

export const semesterCalenderActions = semesterCalenderSlice.actions;

export const semesterCalenderReducer = semesterCalenderSlice.reducer;
