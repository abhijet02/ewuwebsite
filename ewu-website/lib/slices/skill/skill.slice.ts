import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  SkillSliceState,
  GetSkillsAction,
  GetSkillsSuccessAction,
  GetSkillsFailureAction,
} from "./skill.type";

const initState: SkillSliceState = {
  getSkillsStatus: FetchStatus.IDLE,
  getSkillsError: undefined,
  getSkillsResponse: undefined,
};

const skillSlice = createSlice({
  name: "skill",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getSkills: (state, _action: GetSkillsAction) => {
      state.getSkillsStatus = FetchStatus.FETCHING;
      state.getSkillsError = "";
    },
    getSkillsSuccess: (state, action: GetSkillsSuccessAction) => {
      state.getSkillsStatus = FetchStatus.SUCCESS;
      state.getSkillsResponse = action.payload.response;
    },
    getSkillsFailure: (state, action: GetSkillsFailureAction) => {
      state.getSkillsStatus = FetchStatus.FAILURE;
      state.getSkillsError = action.payload.error;
    },

    resetSkill: () => {
      return initState;
    },
  },
});

export const skillActions = skillSlice.actions;
export const skillReducer = skillSlice.reducer;
