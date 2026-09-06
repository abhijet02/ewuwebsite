import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  FooterSliceState,
  GetFootersAction,
  GetFootersFailureAction,
  GetFootersSuccessAction,
} from "./footer.type";

const initState: FooterSliceState = {
  getFootersStatus: FetchStatus.IDLE,
  getFootersError: undefined,
  getFootersResponse: undefined,
};

const footerSlice = createSlice({
  name: "footer",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getFooters: (state, _action: GetFootersAction) => {
      state.getFootersStatus = FetchStatus.FETCHING;
      state.getFootersError = "";
    },
    getFootersSuccess: (state, action: GetFootersSuccessAction) => {
      state.getFootersStatus = FetchStatus.SUCCESS;
      state.getFootersResponse = action.payload.response;
    },
    getFootersFailure: (state, action: GetFootersFailureAction) => {
      state.getFootersStatus = FetchStatus.FAILURE;
      state.getFootersError = action.payload.error;
    },

    resetFooter: () => {
      return initState;
    },
  },
});

export const footerActions = footerSlice.actions;
export const footerReducer = footerSlice.reducer;
