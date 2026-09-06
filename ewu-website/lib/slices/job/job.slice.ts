import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  JobSliceState,
  GetJobFailureAction,
  GetJobsAction,
  GetJobSuccessAction,
} from "./job.type";

const initState: JobSliceState = {
  getJobStatus: FetchStatus.IDLE,
  getJobError: undefined,
  getJobResponse: undefined,
};

const jobSlice = createSlice({
  name: "job",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getJobs: (state, _action: GetJobsAction) => {
      state.getJobStatus = FetchStatus.FETCHING;
      state.getJobError = "";
    },
    getJobsSuccess: (state, action: GetJobSuccessAction) => {
      state.getJobStatus = FetchStatus.SUCCESS;
      state.getJobResponse = action.payload.response;
    },
    getJobsFailure: (state, action: GetJobFailureAction) => {
      state.getJobStatus = FetchStatus.FAILURE;
      state.getJobError = action.payload.error;
    },

    resetJob: () => {
      return initState;
    },
  },
});

export const jobActions = jobSlice.actions;

export const jobReducer = jobSlice.reducer;
