import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  ProgramCategorySliceState,
  GetProgramCategoriesAction,
  GetProgramCategoriesSuccessAction,
  GetProgramCategoriesFailureAction,
} from "./programCategory.type";

const initState: ProgramCategorySliceState = {
  getProgramCategoriesStatus: FetchStatus.IDLE,
  getProgramCategoriesError: undefined,
  getProgramCategoriesResponse: undefined,
};

const programCategorySlice = createSlice({
  name: "programCategory",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getProgramCategories: (state, _action: GetProgramCategoriesAction) => {
      state.getProgramCategoriesStatus = FetchStatus.FETCHING;
      state.getProgramCategoriesError = "";
    },
    getProgramCategoriesSuccess: (
      state,
      action: GetProgramCategoriesSuccessAction
    ) => {
      state.getProgramCategoriesStatus = FetchStatus.SUCCESS;
      state.getProgramCategoriesResponse = action.payload.response;
    },
    getProgramCategoriesFailure: (
      state,
      action: GetProgramCategoriesFailureAction
    ) => {
      state.getProgramCategoriesStatus = FetchStatus.FAILURE;
      state.getProgramCategoriesError = action.payload.error;
    },

    resetProgramCategory: () => {
      return initState;
    },
  },
});

export const programCategoryActions = programCategorySlice.actions;
export const programCategoryReducer = programCategorySlice.reducer;
