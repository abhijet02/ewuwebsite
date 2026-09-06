import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  CategorySliceState,
  GetCategoriesAction,
  GetCategoriesSuccessAction,
  GetCategoriesFailureAction,
} from "./category.type";

const initState: CategorySliceState = {
  getCategoriesStatus: FetchStatus.IDLE,
  getCategoriesError: undefined,
  getCategoriesResponse: undefined,
};

const categorySlice = createSlice({
  name: "category",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getCategories: (state, _action: GetCategoriesAction) => {
      state.getCategoriesStatus = FetchStatus.FETCHING;
      state.getCategoriesError = "";
    },
    getCategoriesSuccess: (state, action: GetCategoriesSuccessAction) => {
      state.getCategoriesStatus = FetchStatus.SUCCESS;
      state.getCategoriesResponse = action.payload.response;
    },
    getCategoriesFailure: (state, action: GetCategoriesFailureAction) => {
      state.getCategoriesStatus = FetchStatus.FAILURE;
      state.getCategoriesError = action.payload.error;
    },

    resetCategory: () => {
      return initState;
    },
  },
});

export const categoryActions = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
