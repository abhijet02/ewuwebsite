import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  ComponentSliceState,
  GetComponentAction,
  GetComponentFailureAction,
  GetComponentSuccessAction,
} from "./component.type";

const initState: ComponentSliceState = {
  getComponentStatus: FetchStatus.IDLE,
  getComponentError: undefined,
  getComponentResponse: undefined,
};

const componentSlice = createSlice({
  name: "component",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getComponent: (state, _action: GetComponentAction) => {
      state.getComponentStatus = FetchStatus.FETCHING;
      state.getComponentError = "";
    },
    getComponentSuccess: (state, action: GetComponentSuccessAction) => {
      state.getComponentStatus = FetchStatus.SUCCESS;
      state.getComponentResponse = action.payload.response;
    },
    getComponentFailure: (state, action: GetComponentFailureAction) => {
      state.getComponentStatus = FetchStatus.FAILURE;
      state.getComponentError = action.payload.error;
    },

    resetComponent: () => {
      return initState;
    },
  },
});

export const componentActions = componentSlice.actions;
export const componentReducer = componentSlice.reducer;
