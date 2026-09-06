import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  JobApplicationSliceState,
  GetJobApplicationsAction,
  GetJobApplicationsSuccessAction,
  GetJobApplicationsFailureAction,
  CreateJobApplicationAction,
  CreateJobApplicationFailureAction,
  CreateJobApplicationSuccessAction,
  UpdateJobApplicationAction,
  UpdateJobApplicationFailureAction,
  UpdateJobApplicationSuccessAction,
  RemoveJobApplicationSuccessAction,
  RemoveJobApplicationFailureAction,
  RemoveJobApplicationAction,
} from "./jobApplication.type";

const initState: JobApplicationSliceState = {
  getJobApplicationsStatus: FetchStatus.IDLE,
  getJobApplicationsError: undefined,
  getJobApplicationsResponse: undefined,
  createJobApplicationStatus: FetchStatus.IDLE,
  createJobApplicationError: undefined,
  createJobApplicationResponse: undefined,
  updateJobApplicationStatus: FetchStatus.IDLE,
  updateJobApplicationError: undefined,
  updateJobApplicationResponse: undefined,
  removeJobApplicationStatus: FetchStatus.IDLE,
  removeJobApplicationError: undefined,
  removeJobApplicationResponse: undefined,
};

const jobApplicationSlice = createSlice({
  name: "jobApplication",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getJobApplications: (state, _action: GetJobApplicationsAction) => {
      state.getJobApplicationsStatus = FetchStatus.FETCHING;
      state.getJobApplicationsError = "";
    },
    getJobApplicationsSuccess: (
      state,
      action: GetJobApplicationsSuccessAction,
    ) => {
      state.getJobApplicationsStatus = FetchStatus.SUCCESS;
      state.getJobApplicationsResponse = action.payload.response;
    },
    getJobApplicationsFailure: (
      state,
      action: GetJobApplicationsFailureAction,
    ) => {
      state.getJobApplicationsStatus = FetchStatus.FAILURE;
      state.getJobApplicationsError = action.payload.error;
    },

    createJobApplication: (state, _action: CreateJobApplicationAction) => {
      state.createJobApplicationStatus = FetchStatus.FETCHING;
      state.createJobApplicationError = "";
    },
    createJobApplicationSuccess: (
      state,
      action: CreateJobApplicationSuccessAction,
    ) => {
      state.createJobApplicationStatus = FetchStatus.SUCCESS;
      state.createJobApplicationResponse = action.payload.response;
    },
    createJobApplicationFailure: (
      state,
      action: CreateJobApplicationFailureAction,
    ) => {
      state.createJobApplicationStatus = FetchStatus.FAILURE;
      state.createJobApplicationError = action.payload.error;
    },

    updateJobApplication: (state, _action: UpdateJobApplicationAction) => {
      state.updateJobApplicationStatus = FetchStatus.FETCHING;
      state.updateJobApplicationError = "";
    },
    updateJobApplicationSuccess: (
      state,
      action: UpdateJobApplicationSuccessAction,
    ) => {
      state.updateJobApplicationStatus = FetchStatus.SUCCESS;
      state.updateJobApplicationResponse = action.payload.response;
    },
    updateJobApplicationFailure: (
      state,
      action: UpdateJobApplicationFailureAction,
    ) => {
      state.updateJobApplicationStatus = FetchStatus.FAILURE;
      state.updateJobApplicationError = action.payload.error;
    },

    removeJobApplication: (state, _action: RemoveJobApplicationAction) => {
      state.removeJobApplicationStatus = FetchStatus.FETCHING;
      state.removeJobApplicationError = "";
    },
    removeJobApplicationSuccess: (
      state,
      action: RemoveJobApplicationSuccessAction,
    ) => {
      state.removeJobApplicationStatus = FetchStatus.SUCCESS;
      state.removeJobApplicationResponse = action.payload.response;
    },
    removeJobApplicationFailure: (
      state,
      action: RemoveJobApplicationFailureAction,
    ) => {
      state.removeJobApplicationStatus = FetchStatus.FAILURE;
      state.removeJobApplicationError = action.payload.error;
    },
    resetCreateJobApplicationStatus: (state) => {
      state.createJobApplicationStatus = FetchStatus.IDLE;
      state.createJobApplicationError = undefined;
      state.createJobApplicationResponse = undefined;
    },
    resetJobApplication: () => {
      return initState;
    },
  },
});

export const jobApplicationActions = jobApplicationSlice.actions;
export const jobApplicationReducer = jobApplicationSlice.reducer;
