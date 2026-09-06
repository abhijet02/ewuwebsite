import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  SemesterSliceState,
  GetSemestersAction,
  GetSemestersSuccessAction,
  GetSemestersFailureAction,
} from "./semester.type";

const initState: SemesterSliceState = {
  getSemestersStatus: FetchStatus.IDLE,
  getSemestersError: undefined,
  getSemestersResponse: undefined,
};

const semesterSlice = createSlice({
  name: "semester",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getSemesters: (state, _action: GetSemestersAction) => {
      state.getSemestersStatus = FetchStatus.FETCHING;
      state.getSemestersError = "";
    },
    getSemestersSuccess: (state, action: GetSemestersSuccessAction) => {
      state.getSemestersStatus = FetchStatus.SUCCESS;
      state.getSemestersResponse = action.payload.response;
    },
    getSemestersFailure: (state, action: GetSemestersFailureAction) => {
      state.getSemestersStatus = FetchStatus.FAILURE;
      state.getSemestersError = action.payload.error;
    },

    resetSemester: () => {
      return initState;
    },
  },
});

export const semesterActions = semesterSlice.actions;
export const semesterReducer = semesterSlice.reducer;
