import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  ProcurementSliceState,
  GetProcurementsAction,
  GetProcurementsFailureAction,
  GetProcurementsSuccessAction,
} from "./procurement.type";

const initState: ProcurementSliceState = {
  getProcurementsStatus: FetchStatus.IDLE,
  getProcurementsError: undefined,
  getProcurementsResponse: undefined,
};

const procurementSlice = createSlice({
  name: "procurement",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getProcurements: (state, _action: GetProcurementsAction) => {
      state.getProcurementsStatus = FetchStatus.FETCHING;
      state.getProcurementsError = "";
    },
    getProcurementsSuccess: (state, action: GetProcurementsSuccessAction) => {
      state.getProcurementsStatus = FetchStatus.SUCCESS;
      state.getProcurementsResponse = action.payload.response;
    },
    getProcurementsFailure: (state, action: GetProcurementsFailureAction) => {
      state.getProcurementsStatus = FetchStatus.FAILURE;
      state.getProcurementsError = action.payload.error;
    },

    resetProcurement: () => {
      return initState;
    },
  },
});

export const procurementActions = procurementSlice.actions;
export const procurementReducer = procurementSlice.reducer;
