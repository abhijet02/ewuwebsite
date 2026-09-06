import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  HelpDeskSliceState,
  GetHelpDesksAction,
  GetHelpDesksFailureAction,
  GetHelpDesksSuccessAction,
} from "./helpDesk.type";

const initState: HelpDeskSliceState = {
  getHelpDesksStatus: FetchStatus.IDLE,
  getHelpDesksError: undefined,
  getHelpDesksResponse: undefined,
};

const helpDeskSlice = createSlice({
  name: "helpDesk",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getHelpDesks: (state, _action: GetHelpDesksAction) => {
      state.getHelpDesksStatus = FetchStatus.FETCHING;
      state.getHelpDesksError = "";
    },
    getHelpDesksSuccess: (state, action: GetHelpDesksSuccessAction) => {
      state.getHelpDesksStatus = FetchStatus.SUCCESS;
      state.getHelpDesksResponse = action.payload.response;
    },
    getHelpDesksFailure: (state, action: GetHelpDesksFailureAction) => {
      state.getHelpDesksStatus = FetchStatus.FAILURE;
      state.getHelpDesksError = action.payload.error;
    },

    resetHelpDesk: () => {
      return initState;
    },
  },
});

export const helpDeskActions = helpDeskSlice.actions;
export const helpDeskReducer = helpDeskSlice.reducer;
