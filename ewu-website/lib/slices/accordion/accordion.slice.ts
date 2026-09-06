import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  AccordionSliceState,
  GetAccordionsAction,
  GetAccordionsFailureAction,
  GetAccordionsSuccessAction,
} from "./accordion.type";

const initState: AccordionSliceState = {
  getAccordionsStatus: FetchStatus.IDLE,
  getAccordionsError: undefined,
  getAccordionsResponse: undefined,
};

const accordionSlice = createSlice({
  name: "accordion",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getAccordions: (state, _action: GetAccordionsAction) => {
      state.getAccordionsStatus = FetchStatus.FETCHING;
      state.getAccordionsError = "";
    },
    getAccordionsSuccess: (state, action: GetAccordionsSuccessAction) => {
      state.getAccordionsStatus = FetchStatus.SUCCESS;
      state.getAccordionsResponse = action.payload.response;
    },
    getAccordionsFailure: (state, action: GetAccordionsFailureAction) => {
      state.getAccordionsStatus = FetchStatus.FAILURE;
      state.getAccordionsError = action.payload.error;
    },

    resetAccordion: () => {
      return initState;
    },
  },
});

export const accordionActions = accordionSlice.actions;
export const accordionReducer = accordionSlice.reducer;
