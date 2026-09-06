import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  ClubActivityRankingSliceState,
  GetClubActivityRankingsAction,
  GetClubActivityRankingsSuccessAction,
  GetClubActivityRankingsFailureAction,
} from "./clubActivityRanking.type";

const initState: ClubActivityRankingSliceState = {
  getClubActivityRankingsStatus: FetchStatus.IDLE,
  getClubActivityRankingsError: undefined,
  getClubActivityRankingsResponse: undefined,
};

const clubActivityRankingSlice = createSlice({
  name: "clubActivityRanking",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getClubActivityRankings: (
      state,
      _action: GetClubActivityRankingsAction
    ) => {
      state.getClubActivityRankingsStatus = FetchStatus.FETCHING;
      state.getClubActivityRankingsError = "";
    },
    getClubActivityRankingsSuccess: (
      state,
      action: GetClubActivityRankingsSuccessAction
    ) => {
      state.getClubActivityRankingsStatus = FetchStatus.SUCCESS;
      state.getClubActivityRankingsResponse = action.payload.response;
    },
    getClubActivityRankingsFailure: (
      state,
      action: GetClubActivityRankingsFailureAction
    ) => {
      state.getClubActivityRankingsStatus = FetchStatus.FAILURE;
      state.getClubActivityRankingsError = action.payload.error;
    },

    resetClubActivityRanking: () => {
      return initState;
    },
  },
});

export const clubActivityRankingActions = clubActivityRankingSlice.actions;
export const clubActivityRankingReducer = clubActivityRankingSlice.reducer;
