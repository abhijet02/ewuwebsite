import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  DescriptionSliceState,
  GetDescriptionFailureAction,
  GetDescriptionsAction,
  GetDescriptionSuccessAction,
} from "./description.type";

const initState: DescriptionSliceState = {
  getDescriptionStatus: FetchStatus.IDLE,
  getDescriptionError: undefined,
  getDescriptionResponse: undefined,
};

const descriptionSlice = createSlice({
  name: "description",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getDescriptions: (state, _action: GetDescriptionsAction) => {
      state.getDescriptionStatus = FetchStatus.FETCHING;
      state.getDescriptionError = "";
    },
    getDescriptionsSuccess: (state, action: GetDescriptionSuccessAction) => {
      state.getDescriptionStatus = FetchStatus.SUCCESS;
      state.getDescriptionResponse = action.payload.response;
    },
    getDescriptionsFailure: (state, action: GetDescriptionFailureAction) => {
      state.getDescriptionStatus = FetchStatus.FAILURE;
      state.getDescriptionError = action.payload.error;
    },

    resetDescription: () => {
      return initState;
    },
  },
});

export const descriptionActions = descriptionSlice.actions;

export const descriptionReducer = descriptionSlice.reducer;
