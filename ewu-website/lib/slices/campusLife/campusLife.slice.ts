import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  CampusLifeSliceState,
  GetCampusLifesAction,
  GetCampusLifesFailureAction,
  GetCampusLifesSuccessAction,
} from "./campusLife.type";

const initState: CampusLifeSliceState = {
  getCampusLifesStatus: FetchStatus.IDLE,
  getCampusLifesError: undefined,
  getCampusLifesResponse: undefined,
};

const campusLifeSlice = createSlice({
  name: "campusLife",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getCampusLifes: (state, _action: GetCampusLifesAction) => {
      state.getCampusLifesStatus = FetchStatus.FETCHING;
      state.getCampusLifesError = "";
    },
    getCampusLifesSuccess: (state, action: GetCampusLifesSuccessAction) => {
      state.getCampusLifesStatus = FetchStatus.SUCCESS;
      state.getCampusLifesResponse = action.payload.response;
    },
    getCampusLifesFailure: (state, action: GetCampusLifesFailureAction) => {
      state.getCampusLifesStatus = FetchStatus.FAILURE;
      state.getCampusLifesError = action.payload.error;
    },

    resetCampusLife: () => {
      return initState;
    },
  },
});

export const campusLifeActions = campusLifeSlice.actions;
export const campusLifeReducer = campusLifeSlice.reducer;
