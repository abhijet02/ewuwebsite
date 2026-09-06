import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  WhyChooseSliceState,
  GetWhyChoosesAction,
  GetWhyChoosesFailureAction,
  GetWhyChoosesSuccessAction,
} from "./whyChoose.type";

const initState: WhyChooseSliceState = {
  getWhyChoosesStatus: FetchStatus.IDLE,
  getWhyChoosesError: undefined,
  getWhyChoosesResponse: undefined,
};

const whyChooseSlice = createSlice({
  name: "whyChoose",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getWhyChooses: (state, _action: GetWhyChoosesAction) => {
      state.getWhyChoosesStatus = FetchStatus.FETCHING;
      state.getWhyChoosesError = "";
    },
    getWhyChoosesSuccess: (state, action: GetWhyChoosesSuccessAction) => {
      state.getWhyChoosesStatus = FetchStatus.SUCCESS;
      state.getWhyChoosesResponse = action.payload.response;
    },
    getWhyChoosesFailure: (state, action: GetWhyChoosesFailureAction) => {
      state.getWhyChoosesStatus = FetchStatus.FAILURE;
      state.getWhyChoosesError = action.payload.error;
    },

    resetWhyChoose: () => {
      return initState;
    },
  },
});

export const whyChooseActions = whyChooseSlice.actions;
export const whyChooseReducer = whyChooseSlice.reducer;
