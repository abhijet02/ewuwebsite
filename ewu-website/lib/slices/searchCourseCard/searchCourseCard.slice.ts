import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  SearchCourseCardSliceState,
  GetSearchCourseCardAction,
  GetSearchCourseCardSuccessAction,
  GetSearchCourseCardFailureAction,
} from "./searchCourseCard.type";

const initState: SearchCourseCardSliceState = {
  getSearchCourseCardStatus: FetchStatus.IDLE,
  getSearchCourseCardError: undefined,
  getSearchCourseCardResponse: undefined,
};

const searchCourseCardSlice = createSlice({
  name: "searchCourseCard",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getSearchCourseCard: (state, _action: GetSearchCourseCardAction) => {
      state.getSearchCourseCardStatus = FetchStatus.FETCHING;
      state.getSearchCourseCardError = "";
    },
    getSearchCourseCardSuccess: (
      state,
      action: GetSearchCourseCardSuccessAction
    ) => {
      state.getSearchCourseCardStatus = FetchStatus.SUCCESS;
      state.getSearchCourseCardResponse = action.payload.response;
    },
    getSearchCourseCardFailure: (
      state,
      action: GetSearchCourseCardFailureAction
    ) => {
      state.getSearchCourseCardStatus = FetchStatus.FAILURE;
      state.getSearchCourseCardError = action.payload.error;
    },

    resetSearchCourseCard: () => {
      return initState;
    },
  },
});

export const searchCourseCardActions = searchCourseCardSlice.actions;
export const searchCourseCardReducer = searchCourseCardSlice.reducer;
