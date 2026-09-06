import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  OfficeMemberSliceState,
  CreateOfficeMemberAction,
  CreateOfficeMemberFailureAction,
  CreateOfficeMemberSuccessAction,
  RemoveOfficeMemberAction,
  RemoveOfficeMemberFailureAction,
  RemoveOfficeMemberSuccessAction,
  UpdateOfficeMemberAction,
  UpdateOfficeMemberFailureAction,
  UpdateOfficeMemberSuccessAction,
  GetOfficeMembersAction,
  GetOfficeMembersFailureAction,
  GetOfficeMembersSuccessAction,
} from "./officeMember.type";

const initState: OfficeMemberSliceState = {
  getOfficeMembersStatus: FetchStatus.IDLE,
  getOfficeMembersError: undefined,
  getOfficeMembersResponse: undefined,
  createOfficeMemberStatus: FetchStatus.IDLE,
  createOfficeMemberError: undefined,
  createOfficeMemberResponse: undefined,
  updateOfficeMemberStatus: FetchStatus.IDLE,
  updateOfficeMemberError: undefined,
  updateOfficeMemberResponse: undefined,
  removeOfficeMemberStatus: FetchStatus.IDLE,
  removeOfficeMemberError: undefined,
  removeOfficeMemberResponse: undefined,
};

const officeMemberSlice = createSlice({
  name: "officeMember",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getOfficeMembers: (state, _action: GetOfficeMembersAction) => {
      state.getOfficeMembersStatus = FetchStatus.FETCHING;
      state.getOfficeMembersError = "";
    },
    getOfficeMembersSuccess: (state, action: GetOfficeMembersSuccessAction) => {
      state.getOfficeMembersStatus = FetchStatus.SUCCESS;
      state.getOfficeMembersResponse = action.payload.response;
    },
    getOfficeMembersFailure: (state, action: GetOfficeMembersFailureAction) => {
      state.getOfficeMembersStatus = FetchStatus.FAILURE;
      state.getOfficeMembersError = action.payload.error;
    },

    createOfficeMember: (state, _action: CreateOfficeMemberAction) => {
      state.createOfficeMemberStatus = FetchStatus.FETCHING;
      state.createOfficeMemberError = "";
    },
    createOfficeMemberSuccess: (
      state,
      action: CreateOfficeMemberSuccessAction,
    ) => {
      state.createOfficeMemberStatus = FetchStatus.SUCCESS;
      state.createOfficeMemberResponse = action.payload.response;
    },
    createOfficeMemberFailure: (
      state,
      action: CreateOfficeMemberFailureAction,
    ) => {
      state.createOfficeMemberStatus = FetchStatus.FAILURE;
      state.createOfficeMemberError = action.payload.error;
    },

    updateOfficeMember: (state, _action: UpdateOfficeMemberAction) => {
      state.updateOfficeMemberStatus = FetchStatus.FETCHING;
      state.updateOfficeMemberError = "";
    },
    updateOfficeMemberSuccess: (
      state,
      action: UpdateOfficeMemberSuccessAction,
    ) => {
      state.updateOfficeMemberStatus = FetchStatus.SUCCESS;
      state.updateOfficeMemberResponse = action.payload.response;
    },
    updateOfficeMemberFailure: (
      state,
      action: UpdateOfficeMemberFailureAction,
    ) => {
      state.updateOfficeMemberStatus = FetchStatus.FAILURE;
      state.updateOfficeMemberError = action.payload.error;
    },

    removeOfficeMember: (state, _action: RemoveOfficeMemberAction) => {
      state.removeOfficeMemberStatus = FetchStatus.FETCHING;
      state.removeOfficeMemberError = "";
    },
    removeOfficeMemberSuccess: (
      state,
      action: RemoveOfficeMemberSuccessAction,
    ) => {
      state.removeOfficeMemberStatus = FetchStatus.SUCCESS;
      state.removeOfficeMemberResponse = action.payload.response;
    },
    removeOfficeMemberFailure: (
      state,
      action: RemoveOfficeMemberFailureAction,
    ) => {
      state.removeOfficeMemberStatus = FetchStatus.FAILURE;
      state.removeOfficeMemberError = action.payload.error;
    },

    resetOfficeMember: () => {
      return initState;
    },
  },
});

export const officeMemberActions = officeMemberSlice.actions;
export const officeMemberReducer = officeMemberSlice.reducer;
