import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  ClubMemberSliceState,
  GetClubMembersAction,
  GetClubMembersSuccessAction,
  GetClubMembersFailureAction,
  CreateClubMemberAction,
  CreateClubMemberFailureAction,
  CreateClubMemberSuccessAction,
  RemoveClubMemberAction,
  RemoveClubMemberFailureAction,
  RemoveClubMemberSuccessAction,
  UpdateClubMemberAction,
  UpdateClubMemberFailureAction,
  UpdateClubMemberSuccessAction,
} from "./clubMember.type";

const initState: ClubMemberSliceState = {
  getClubMembersStatus: FetchStatus.IDLE,
  getClubMembersError: undefined,
  getClubMembersResponse: undefined,
  createClubMemberStatus: FetchStatus.IDLE,
  createClubMemberError: undefined,
  createClubMemberResponse: undefined,
  updateClubMemberStatus: FetchStatus.IDLE,
  updateClubMemberError: undefined,
  updateClubMemberResponse: undefined,
  removeClubMemberStatus: FetchStatus.IDLE,
  removeClubMemberError: undefined,
  removeClubMemberResponse: undefined,
};

const clubMemberSlice = createSlice({
  name: "clubMember",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getClubMembers: (state, _action: GetClubMembersAction) => {
      state.getClubMembersStatus = FetchStatus.FETCHING;
      state.getClubMembersError = "";
    },
    getClubMembersSuccess: (state, action: GetClubMembersSuccessAction) => {
      state.getClubMembersStatus = FetchStatus.SUCCESS;
      state.getClubMembersResponse = action.payload.response;
    },
    getClubMembersFailure: (state, action: GetClubMembersFailureAction) => {
      state.getClubMembersStatus = FetchStatus.FAILURE;
      state.getClubMembersError = action.payload.error;
    },

    createClubMember: (state, _action: CreateClubMemberAction) => {
      state.createClubMemberStatus = FetchStatus.FETCHING;
      state.createClubMemberError = "";
    },
    createClubMemberSuccess: (state, action: CreateClubMemberSuccessAction) => {
      state.createClubMemberStatus = FetchStatus.SUCCESS;
      state.createClubMemberResponse = action.payload.response;
    },
    createClubMemberFailure: (state, action: CreateClubMemberFailureAction) => {
      state.createClubMemberStatus = FetchStatus.FAILURE;
      state.createClubMemberError = action.payload.error;
    },

    updateClubMember: (state, _action: UpdateClubMemberAction) => {
      state.updateClubMemberStatus = FetchStatus.FETCHING;
      state.updateClubMemberError = "";
    },
    updateClubMemberSuccess: (state, action: UpdateClubMemberSuccessAction) => {
      state.updateClubMemberStatus = FetchStatus.SUCCESS;
      state.updateClubMemberResponse = action.payload.response;
    },
    updateClubMemberFailure: (state, action: UpdateClubMemberFailureAction) => {
      state.updateClubMemberStatus = FetchStatus.FAILURE;
      state.updateClubMemberError = action.payload.error;
    },

    removeClubMember: (state, _action: RemoveClubMemberAction) => {
      state.removeClubMemberStatus = FetchStatus.FETCHING;
      state.removeClubMemberError = "";
    },
    removeClubMemberSuccess: (state, action: RemoveClubMemberSuccessAction) => {
      state.removeClubMemberStatus = FetchStatus.SUCCESS;
      state.removeClubMemberResponse = action.payload.response;
    },
    removeClubMemberFailure: (state, action: RemoveClubMemberFailureAction) => {
      state.removeClubMemberStatus = FetchStatus.FAILURE;
      state.removeClubMemberError = action.payload.error;
    },

    resetClubMember: () => {
      return initState;
    },
  },
});

export const clubMemberActions = clubMemberSlice.actions;

export const clubMemberReducer = clubMemberSlice.reducer;
