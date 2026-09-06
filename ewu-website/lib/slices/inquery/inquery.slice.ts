import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  InquerySliceState,
  GetInquerysAction,
  GetInquerysSuccessAction,
  GetInquerysFailureAction,
  CreateInqueryAction,
  CreateInqueryFailureAction,
  CreateInquerySuccessAction,
  RemoveInqueryAction,
  RemoveInqueryFailureAction,
  RemoveInquerySuccessAction,
  UpdateInqueryAction,
  UpdateInqueryFailureAction,
  UpdateInquerySuccessAction,
} from "./inquery.type";

const initState: InquerySliceState = {
  getInquerysStatus: FetchStatus.IDLE,
  getInquerysError: undefined,
  getInquerysResponse: undefined,
  createInqueryStatus: FetchStatus.IDLE,
  createInqueryError: undefined,
  createInqueryResponse: undefined,
  updateInqueryStatus: FetchStatus.IDLE,
  updateInqueryError: undefined,
  updateInqueryResponse: undefined,
  removeInqueryStatus: FetchStatus.IDLE,
  removeInqueryError: undefined,
  removeInqueryResponse: undefined,
};

const inquerySlice = createSlice({
  name: "inquery",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getInquerys: (state, _action: GetInquerysAction) => {
      state.getInquerysStatus = FetchStatus.FETCHING;
      state.getInquerysError = "";
    },
    getInquerysSuccess: (state, action: GetInquerysSuccessAction) => {
      state.getInquerysStatus = FetchStatus.SUCCESS;
      state.getInquerysResponse = action.payload.response;
    },
    getInquerysFailure: (state, action: GetInquerysFailureAction) => {
      state.getInquerysStatus = FetchStatus.FAILURE;
      state.getInquerysError = action.payload.error;
    },

    createInquery: (state, _action: CreateInqueryAction) => {
      state.createInqueryStatus = FetchStatus.FETCHING;
      state.createInqueryError = "";
    },
    createInquerySuccess: (state, action: CreateInquerySuccessAction) => {
      state.createInqueryStatus = FetchStatus.SUCCESS;
      state.createInqueryResponse = action.payload.response;
    },
    createInqueryFailure: (state, action: CreateInqueryFailureAction) => {
      state.createInqueryStatus = FetchStatus.FAILURE;
      state.createInqueryError = action.payload.error;
    },

    updateInquery: (state, _action: UpdateInqueryAction) => {
      state.updateInqueryStatus = FetchStatus.FETCHING;
      state.updateInqueryError = "";
    },
    updateInquerySuccess: (state, action: UpdateInquerySuccessAction) => {
      state.updateInqueryStatus = FetchStatus.SUCCESS;
      state.updateInqueryResponse = action.payload.response;
    },
    updateInqueryFailure: (state, action: UpdateInqueryFailureAction) => {
      state.updateInqueryStatus = FetchStatus.FAILURE;
      state.updateInqueryError = action.payload.error;
    },

    removeInquery: (state, _action: RemoveInqueryAction) => {
      state.removeInqueryStatus = FetchStatus.FETCHING;
      state.removeInqueryError = "";
    },
    removeInquerySuccess: (state, action: RemoveInquerySuccessAction) => {
      state.removeInqueryStatus = FetchStatus.SUCCESS;
      state.removeInqueryResponse = action.payload.response;
    },
    removeInqueryFailure: (state, action: RemoveInqueryFailureAction) => {
      state.removeInqueryStatus = FetchStatus.FAILURE;
      state.removeInqueryError = action.payload.error;
    },

    resetInquery: () => {
      return initState;
    },
  },
});

export const inqueryActions = inquerySlice.actions;
export const inqueryReducer = inquerySlice.reducer;
