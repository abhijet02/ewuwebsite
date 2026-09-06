import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  ViewAllSliceState,
  GetViewAllsAction,
  GetViewAllsFailureAction,
  GetViewAllsSuccessAction,
} from "./viewAll.type";

const initState: ViewAllSliceState = {
  getViewAllsStatus: FetchStatus.IDLE,
  getViewAllsError: undefined,
  getViewAllsResponse: undefined,
};

const viewAllSlice = createSlice({
  name: "viewAll",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getViewAlls: (state, _action: GetViewAllsAction) => {
      state.getViewAllsStatus = FetchStatus.FETCHING;
      state.getViewAllsError = "";
    },
    getViewAllsSuccess: (state, action: GetViewAllsSuccessAction) => {
      state.getViewAllsStatus = FetchStatus.SUCCESS;
      state.getViewAllsResponse = action.payload.response;
    },
    getViewAllsFailure: (state, action: GetViewAllsFailureAction) => {
      state.getViewAllsStatus = FetchStatus.FAILURE;
      state.getViewAllsError = action.payload.error;
    },

    resetViewAll: () => {
      return initState;
    },
  },
});

export const viewAllActions = viewAllSlice.actions;
export const viewAllReducer = viewAllSlice.reducer;
