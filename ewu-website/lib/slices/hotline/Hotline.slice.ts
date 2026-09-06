import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  HotlineSliceState,
  GetHotlineAction,
  GetHotlineSuccessAction,
  GetHotlineFailureAction,
} from "./Hotline.type";

const initState: HotlineSliceState = {
  getHotlineStatus: FetchStatus.IDLE,
  getHotlineError: undefined,
  getHotlineResponse: undefined,
};

const hotlineSlice = createSlice({
  name: "hotline",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getHotline: (state, _action: GetHotlineAction) => {
      state.getHotlineStatus = FetchStatus.FETCHING;
      state.getHotlineError = "";
    },
    getHotlineSuccess: (state, action: GetHotlineSuccessAction) => {
      state.getHotlineStatus = FetchStatus.SUCCESS;
      state.getHotlineResponse = action.payload.response;
    },
    getHotlineFailure: (state, action: GetHotlineFailureAction) => {
      state.getHotlineStatus = FetchStatus.FAILURE;
      state.getHotlineError = action.payload.error;
    },

    resetHotline: () => {
      return initState;
    },
  },
});

export const hotlineActions = hotlineSlice.actions;
export const hotlineReducer = hotlineSlice.reducer;
