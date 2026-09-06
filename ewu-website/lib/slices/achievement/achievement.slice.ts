import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  AchievementSliceState,
  GetAchievementsAction,
  GetAchievementsSuccessAction,
  GetAchievementsFailureAction,
} from "./achievement.type";

const initState: AchievementSliceState = {
  getAchievementsStatus: FetchStatus.IDLE,
  getAchievementsError: undefined,
  getAchievementsResponse: undefined,
};

const achievementSlice = createSlice({
  name: "achievement",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getAchievements: (state, _action: GetAchievementsAction) => {
      state.getAchievementsStatus = FetchStatus.FETCHING;
      state.getAchievementsError = "";
    },
    getAchievementsSuccess: (state, action: GetAchievementsSuccessAction) => {
      state.getAchievementsStatus = FetchStatus.SUCCESS;
      state.getAchievementsResponse = action.payload.response;
    },
    getAchievementsFailure: (state, action: GetAchievementsFailureAction) => {
      state.getAchievementsStatus = FetchStatus.FAILURE;
      state.getAchievementsError = action.payload.error;
    },

    resetAchievement: () => {
      return initState;
    },
  },
});

export const achievementActions = achievementSlice.actions;

export const achievementReducer = achievementSlice.reducer;
