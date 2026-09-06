import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  PublicationSliceState,
  GetPublicationsAction,
  GetPublicationsFailureAction,
  GetPublicationsSuccessAction,
} from "./publication.type";

const initState: PublicationSliceState = {
  getPublicationsStatus: FetchStatus.IDLE,
  getPublicationsError: undefined,
  getPublicationsResponse: undefined,
};

const publicationSlice = createSlice({
  name: "publication",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getPublications: (state, _action: GetPublicationsAction) => {
      state.getPublicationsStatus = FetchStatus.FETCHING;
      state.getPublicationsError = "";
    },
    getPublicationsSuccess: (state, action: GetPublicationsSuccessAction) => {
      state.getPublicationsStatus = FetchStatus.SUCCESS;
      state.getPublicationsResponse = action.payload.response;
    },
    getPublicationsFailure: (state, action: GetPublicationsFailureAction) => {
      state.getPublicationsStatus = FetchStatus.FAILURE;
      state.getPublicationsError = action.payload.error;
    },

    resetPublication: () => {
      return initState;
    },
  },
});

export const publicationActions = publicationSlice.actions;
export const publicationReducer = publicationSlice.reducer;
