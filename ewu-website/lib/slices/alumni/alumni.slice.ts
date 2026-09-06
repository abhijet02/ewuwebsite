import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  AlumniSliceState,
  GetAlumnisAction,
  GetAlumnisFailureAction,
  GetAlumnisSuccessAction,
} from "./alumni.type";

const initState: AlumniSliceState = {
  getAlumniStatus: FetchStatus.IDLE,
  getAlumniError: undefined,
  getAlumniResponse: undefined,
};

const alumniSlice = createSlice({
  name: "alumni",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getAlumni: (state, _action: GetAlumnisAction) => {
      state.getAlumniStatus = FetchStatus.FETCHING;
      state.getAlumniError = "";
    },
    getAlumniSuccess: (state, action: GetAlumnisSuccessAction) => {
      state.getAlumniStatus = FetchStatus.SUCCESS;
      state.getAlumniResponse = action.payload.response;
    },
    getAlumniFailure: (state, action: GetAlumnisFailureAction) => {
      state.getAlumniStatus = FetchStatus.FAILURE;
      state.getAlumniError = action.payload.error;
    },

    resetAlumni: () => {
      return initState;
    },
  },
});

export const alumniActions = alumniSlice.actions;
export const alumniReducer = alumniSlice.reducer;
