import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  ProgramSliceState,
  GetProgramsAction,
  GetProgramsFailureAction,
  GetProgramsSuccessAction,
} from "./program.type";

const initState: ProgramSliceState = {
  getProgramsStatus: FetchStatus.IDLE,
  getProgramsError: undefined,
  getProgramsResponse: undefined,
};

const programSlice = createSlice({
  name: "program",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getPrograms: (state, _action: GetProgramsAction) => {
      state.getProgramsStatus = FetchStatus.FETCHING;
      state.getProgramsError = "";
    },
    getProgramsSuccess: (state, action: GetProgramsSuccessAction) => {
      state.getProgramsStatus = FetchStatus.SUCCESS;
      state.getProgramsResponse = action.payload.response;
    },
    getProgramsFailure: (state, action: GetProgramsFailureAction) => {
      state.getProgramsStatus = FetchStatus.FAILURE;
      state.getProgramsError = action.payload.error;
    },

    resetProgram: () => {
      return initState;
    },
  },
});

export const programActions = programSlice.actions;
export const programReducer = programSlice.reducer;
