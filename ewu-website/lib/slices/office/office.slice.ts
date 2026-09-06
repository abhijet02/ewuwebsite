import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  OfficeSliceState,
  GetOfficesAction,
  GetOfficesFailureAction,
  GetOfficesSuccessAction,
} from "./office.type";

const initState: OfficeSliceState = {
  getOfficesStatus: FetchStatus.IDLE,
  getOfficesError: undefined,
  getOfficesResponse: undefined,
};

const officeSlice = createSlice({
  name: "office",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getOffices: (state, _action: GetOfficesAction) => {
      state.getOfficesStatus = FetchStatus.FETCHING;
      state.getOfficesError = "";
    },
    getOfficesSuccess: (state, action: GetOfficesSuccessAction) => {
      state.getOfficesStatus = FetchStatus.SUCCESS;
      state.getOfficesResponse = action.payload.response;
    },
    getOfficesFailure: (state, action: GetOfficesFailureAction) => {
      state.getOfficesStatus = FetchStatus.FAILURE;
      state.getOfficesError = action.payload.error;
    },

    resetOffice: () => {
      return initState;
    },
  },
});

export const officeActions = officeSlice.actions;
export const officeReducer = officeSlice.reducer;
