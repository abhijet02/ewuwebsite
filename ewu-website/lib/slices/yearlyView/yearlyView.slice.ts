import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  YearlyViewSliceState,
  GetYearlyViewsAction,
  GetYearlyViewsSuccessAction,
  GetYearlyViewsFailureAction,
} from "./yearlyView.type";

const initState: YearlyViewSliceState = {
  getYearlyViewsStatus: FetchStatus.IDLE,
  getYearlyViewsError: undefined,
  getYearlyViewsResponse: undefined,
};

const yearlyViewSlice = createSlice({
  name: "yearlyView",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getYearlyViews: (state, _action: GetYearlyViewsAction) => {
      state.getYearlyViewsStatus = FetchStatus.FETCHING;
      state.getYearlyViewsError = "";
    },
    getYearlyViewsSuccess: (state, action: GetYearlyViewsSuccessAction) => {
      state.getYearlyViewsStatus = FetchStatus.SUCCESS;
      state.getYearlyViewsResponse = action.payload.response;
    },
    getYearlyViewsFailure: (state, action: GetYearlyViewsFailureAction) => {
      state.getYearlyViewsStatus = FetchStatus.FAILURE;
      state.getYearlyViewsError = action.payload.error;
    },

    resetYearlyView: () => {
      return initState;
    },
  },
});

export const yearlyViewActions = yearlyViewSlice.actions;
export const yearlyViewReducer = yearlyViewSlice.reducer;
