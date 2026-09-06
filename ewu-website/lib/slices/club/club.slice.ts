import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  ClubSliceState,
  GetClubsAction,
  GetClubsSuccessAction,
  GetClubsFailureAction,
} from "./club.type";

const initState: ClubSliceState = {
  getClubsStatus: FetchStatus.IDLE,
  getClubsError: undefined,
  getClubsResponse: undefined,
};

const clubSlice = createSlice({
  name: "club",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getClubs: (state, _action: GetClubsAction) => {
      state.getClubsStatus = FetchStatus.FETCHING;
      state.getClubsError = "";
    },
    getClubsSuccess: (state, action: GetClubsSuccessAction) => {
      state.getClubsStatus = FetchStatus.SUCCESS;
      state.getClubsResponse = action.payload.response;
    },
    getClubsFailure: (state, action: GetClubsFailureAction) => {
      state.getClubsStatus = FetchStatus.FAILURE;
      state.getClubsError = action.payload.error;
    },

    resetClub: () => {
      return initState;
    },
  },
});

export const clubActions = clubSlice.actions;

export const clubReducer = clubSlice.reducer;
