import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  AboutOrgSliceState,
  GetAboutOrgsAction,
  GetAboutOrgsFailureAction,
  GetAboutOrgsSuccessAction,
} from "./aboutOrg.type";

const initState: AboutOrgSliceState = {
  getAboutOrgsStatus: FetchStatus.IDLE,
  getAboutOrgsError: undefined,
  getAboutOrgsResponse: undefined,
};

const aboutOrgSlice = createSlice({
  name: "aboutOrg",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getAboutOrgs: (state, _action: GetAboutOrgsAction) => {
      state.getAboutOrgsStatus = FetchStatus.FETCHING;
      state.getAboutOrgsError = "";
    },
    getAboutOrgsSuccess: (state, action: GetAboutOrgsSuccessAction) => {
      state.getAboutOrgsStatus = FetchStatus.SUCCESS;
      state.getAboutOrgsResponse = action.payload.response;
    },
    getAboutOrgsFailure: (state, action: GetAboutOrgsFailureAction) => {
      state.getAboutOrgsStatus = FetchStatus.FAILURE;
      state.getAboutOrgsError = action.payload.error;
    },

    resetAboutOrg: () => {
      return initState;
    },
  },
});

export const aboutOrgActions = aboutOrgSlice.actions;
export const aboutOrgReducer = aboutOrgSlice.reducer;
