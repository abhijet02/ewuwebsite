import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  FollowUsSliceState,
  GetFollowUsAction,
  GetFollowUsSuccessAction,
  GetFollowUsFailureAction,
} from "./FollowUs.type";

const initState: FollowUsSliceState = {
  getFollowUsStatus: FetchStatus.IDLE,
  getFollowUsError: undefined,
  getFollowUsResponse: undefined,
};

const followUsSlice = createSlice({
  name: "followUs",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getFollowUs: (state, _action: GetFollowUsAction) => {
      state.getFollowUsStatus = FetchStatus.FETCHING;
      state.getFollowUsError = "";
    },
    getFollowUsSuccess: (state, action: GetFollowUsSuccessAction) => {
      state.getFollowUsStatus = FetchStatus.SUCCESS;
      state.getFollowUsResponse = action.payload.response;
    },
    getFollowUsFailure: (state, action: GetFollowUsFailureAction) => {
      state.getFollowUsStatus = FetchStatus.FAILURE;
      state.getFollowUsError = action.payload.error;
    },

    resetFollowUs: () => {
      return initState;
    },
  },
});

export const followUsActions = followUsSlice.actions;
export const followUsReducer = followUsSlice.reducer;
