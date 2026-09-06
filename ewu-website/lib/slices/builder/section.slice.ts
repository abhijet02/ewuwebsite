import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  SectionSliceState,
  GetSectionsAction,
  GetSectionsSuccessAction,
  GetSectionsFailureAction,
} from "./section.type";

const initState: SectionSliceState = {
  getSectionsStatus: FetchStatus.IDLE,
  getSectionsError: undefined,
  getSectionsResponse: undefined,
};

const sectionSlice = createSlice({
  name: "section",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getSections: (state, _action: GetSectionsAction) => {
      state.getSectionsStatus = FetchStatus.FETCHING;
      state.getSectionsError = "";
    },
    getSectionsSuccess: (state, action: GetSectionsSuccessAction) => {
      state.getSectionsStatus = FetchStatus.SUCCESS;
      state.getSectionsResponse = action.payload.response;
    },
    getSectionsFailure: (state, action: GetSectionsFailureAction) => {
      state.getSectionsStatus = FetchStatus.FAILURE;
      state.getSectionsError = action.payload.error;
    },
    
    resetSection: () => {
      return initState;
    },
  },
});

export const sectionActions = sectionSlice.actions;
export const sectionReducer = sectionSlice.reducer;
