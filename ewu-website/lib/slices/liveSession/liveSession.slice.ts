import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  LiveSessionSliceState,
  CreateLiveSessionAction,
  CreateLiveSessionFailureAction,
  CreateLiveSessionSuccessAction,
  RemoveLiveSessionAction,
  RemoveLiveSessionFailureAction,
  RemoveLiveSessionSuccessAction,
  UpdateLiveSessionAction,
  UpdateLiveSessionFailureAction,
  UpdateLiveSessionSuccessAction,
  GetLiveSessionsAction,
  GetLiveSessionsFailureAction,
  GetLiveSessionsSuccessAction,
} from "./liveSession.type";

const initState: LiveSessionSliceState = {
  getLiveSessionsStatus: FetchStatus.IDLE,
  getLiveSessionsError: undefined,
  getLiveSessionsResponse: undefined,
  createLiveSessionStatus: FetchStatus.IDLE,
  createLiveSessionError: undefined,
  createLiveSessionResponse: undefined,
  updateLiveSessionStatus: FetchStatus.IDLE,
  updateLiveSessionError: undefined,
  updateLiveSessionResponse: undefined,
  removeLiveSessionStatus: FetchStatus.IDLE,
  removeLiveSessionError: undefined,
  removeLiveSessionResponse: undefined,
};

const liveSessionSlice = createSlice({
  name: "liveSession",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getLiveSessions: (state, _action: GetLiveSessionsAction) => {
      state.getLiveSessionsStatus = FetchStatus.FETCHING;
      state.getLiveSessionsError = "";
    },
    getLiveSessionsSuccess: (state, action: GetLiveSessionsSuccessAction) => {
      state.getLiveSessionsStatus = FetchStatus.SUCCESS;
      state.getLiveSessionsResponse = action.payload.response;
    },
    getLiveSessionsFailure: (state, action: GetLiveSessionsFailureAction) => {
      state.getLiveSessionsStatus = FetchStatus.FAILURE;
      state.getLiveSessionsError = action.payload.error;
    },

    createLiveSession: (state, _action: CreateLiveSessionAction) => {
      state.createLiveSessionStatus = FetchStatus.FETCHING;
      state.createLiveSessionError = "";
    },
    createLiveSessionSuccess: (
      state,
      action: CreateLiveSessionSuccessAction,
    ) => {
      state.createLiveSessionStatus = FetchStatus.SUCCESS;
      state.createLiveSessionResponse = action.payload.response;
    },
    createLiveSessionFailure: (
      state,
      action: CreateLiveSessionFailureAction,
    ) => {
      state.createLiveSessionStatus = FetchStatus.FAILURE;
      state.createLiveSessionError = action.payload.error;
    },

    updateLiveSession: (state, _action: UpdateLiveSessionAction) => {
      state.updateLiveSessionStatus = FetchStatus.FETCHING;
      state.updateLiveSessionError = "";
    },
    updateLiveSessionSuccess: (
      state,
      action: UpdateLiveSessionSuccessAction,
    ) => {
      state.updateLiveSessionStatus = FetchStatus.SUCCESS;
      state.updateLiveSessionResponse = action.payload.response;
    },
    updateLiveSessionFailure: (
      state,
      action: UpdateLiveSessionFailureAction,
    ) => {
      state.updateLiveSessionStatus = FetchStatus.FAILURE;
      state.updateLiveSessionError = action.payload.error;
    },

    removeLiveSession: (state, _action: RemoveLiveSessionAction) => {
      state.removeLiveSessionStatus = FetchStatus.FETCHING;
      state.removeLiveSessionError = "";
    },
    removeLiveSessionSuccess: (
      state,
      action: RemoveLiveSessionSuccessAction,
    ) => {
      state.removeLiveSessionStatus = FetchStatus.SUCCESS;
      state.removeLiveSessionResponse = action.payload.response;
    },
    removeLiveSessionFailure: (
      state,
      action: RemoveLiveSessionFailureAction,
    ) => {
      state.removeLiveSessionStatus = FetchStatus.FAILURE;
      state.removeLiveSessionError = action.payload.error;
    },

    resetLiveSession: () => {
      return initState;
    },
  },
});

export const liveSessionActions = liveSessionSlice.actions;
export const liveSessionReducer = liveSessionSlice.reducer;
