import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  StudentsSaySliceState,
  GetStudentsSaysAction,
  GetStudentsSaysFailureAction,
  GetStudentsSaysSuccessAction,
} from "./studentsSay.type";

const initState: StudentsSaySliceState = {
  getStudentsSaysStatus: FetchStatus.IDLE,
  getStudentsSaysError: undefined,
  getStudentsSaysResponse: undefined,
};

const studentsSaySlice = createSlice({
  name: "studentsSay",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getStudentsSays: (state, _action: GetStudentsSaysAction) => {
      state.getStudentsSaysStatus = FetchStatus.FETCHING;
      state.getStudentsSaysError = "";
    },
    getStudentsSaysSuccess: (state, action: GetStudentsSaysSuccessAction) => {
      state.getStudentsSaysStatus = FetchStatus.SUCCESS;
      state.getStudentsSaysResponse = action.payload.response;
    },
    getStudentsSaysFailure: (state, action: GetStudentsSaysFailureAction) => {
      state.getStudentsSaysStatus = FetchStatus.FAILURE;
      state.getStudentsSaysError = action.payload.error;
    },

    resetStudentsSay: () => {
      return initState;
    },
  },
});

export const studentsSayActions = studentsSaySlice.actions;
export const studentsSayReducer = studentsSaySlice.reducer;
