import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@/lib/services/fetch.type";
import {
  ContactInfoSliceState,
  GetContactInfoAction,
  GetContactInfoSuccessAction,
  GetContactInfoFailureAction,
} from "./contactInfo.type";

const initState: ContactInfoSliceState = {
  getContactInfoStatus: FetchStatus.IDLE,
  getContactInfoError: undefined,
  getContactInfoResponse: undefined,
};

const contactInfoSlice = createSlice({
  name: "contactInfo",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getContactInfo: (state, _action: GetContactInfoAction) => {
      state.getContactInfoStatus = FetchStatus.FETCHING;
      state.getContactInfoError = "";
    },
    getContactInfoSuccess: (state, action: GetContactInfoSuccessAction) => {
      state.getContactInfoStatus = FetchStatus.SUCCESS;
      state.getContactInfoResponse = action.payload.response;
    },
    getContactInfoFailure: (state, action: GetContactInfoFailureAction) => {
      state.getContactInfoStatus = FetchStatus.FAILURE;
      state.getContactInfoError = action.payload.error;
    },

    resetContactInfo: () => {
      return initState;
    },
  },
});

export const contactInfoActions = contactInfoSlice.actions;

export const contactInfoReducer = contactInfoSlice.reducer;
