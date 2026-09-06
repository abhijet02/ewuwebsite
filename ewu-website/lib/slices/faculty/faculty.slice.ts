import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@/lib/services/fetch.type";
import {
  FacultySliceState,
  GetFacultysAction,
  GetFacultysFailureAction,
  GetFacultysSuccessAction,
} from "./faculty.type";

const initState: FacultySliceState = {
  getFacultysStatus: FetchStatus.IDLE,
  getFacultysError: undefined,
  getFacultysResponse: undefined,
};

const facultySlice = createSlice({
  name: "faculty",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getFacultys: (state, _action: GetFacultysAction) => {
      state.getFacultysStatus = FetchStatus.FETCHING;
      state.getFacultysError = "";
    },
    getFacultysSuccess: (state, action: GetFacultysSuccessAction) => {
      state.getFacultysStatus = FetchStatus.SUCCESS;
      state.getFacultysResponse = action.payload.response;
    },
    getFacultysFailure: (state, action: GetFacultysFailureAction) => {
      state.getFacultysStatus = FetchStatus.FAILURE;
      state.getFacultysError = action.payload.error;
    },

    resetFaculty: () => {
      return initState;
    },
  },
});

export const facultyActions = facultySlice.actions;

export const facultyReducer = facultySlice.reducer;
