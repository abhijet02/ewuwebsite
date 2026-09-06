import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  PartnershipSliceState,
  GetPartnershipsAction,
  GetPartnershipsSuccessAction,
  GetPartnershipsFailureAction,
} from "./partnership.type";

const initState: PartnershipSliceState = {
  getPartnershipStatus: FetchStatus.IDLE,
  getPartnershipError: undefined,
  getPartnershipResponse: undefined,
};

const partnershipSlice = createSlice({
  name: "partnership",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getPartnerships: (state, _action: GetPartnershipsAction) => {
      state.getPartnershipStatus = FetchStatus.FETCHING;
      state.getPartnershipError = "";
    },
    getPartnershipsSuccess: (state, action: GetPartnershipsSuccessAction) => {
      state.getPartnershipStatus = FetchStatus.SUCCESS;
      state.getPartnershipResponse = action.payload.response;
    },
    getPartnershipsFailure: (state, action: GetPartnershipsFailureAction) => {
      state.getPartnershipStatus = FetchStatus.FAILURE;
      state.getPartnershipError = action.payload.error;
    },

    resetPartnership: () => {
      return initState;
    },
  },
});

export const partnershipActions = partnershipSlice.actions;
export const partnershipReducer = partnershipSlice.reducer;
