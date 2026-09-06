import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  BuilderSliceState,
  GetBuildersAction,
  GetBuildersSuccessAction,
  GetBuildersFailureAction,
} from "./builder.type";

const initState: BuilderSliceState = {
  getBuildersStatus: FetchStatus.IDLE,
  getBuildersError: undefined,
  getBuildersResponse: undefined,
};

const builderSlice = createSlice({
  name: "builder",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getBuilders: (state, _action: GetBuildersAction) => {
      state.getBuildersStatus = FetchStatus.FETCHING;
      state.getBuildersError = "";
    },
    getBuildersSuccess: (state, action: GetBuildersSuccessAction) => {
      state.getBuildersStatus = FetchStatus.SUCCESS;
      state.getBuildersResponse = action.payload.response;
    },
    getBuildersFailure: (state, action: GetBuildersFailureAction) => {
      state.getBuildersStatus = FetchStatus.FAILURE;
      state.getBuildersError = action.payload.error;
    },
    
    resetBuilder: () => {
      return initState;
    },
  },
});

export const builderActions = builderSlice.actions;
export const builderReducer = builderSlice.reducer;
