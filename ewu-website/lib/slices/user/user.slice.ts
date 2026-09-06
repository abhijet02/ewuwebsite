import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  UserSliceState,
  GetUsersAction,
  GetUsersSuccessAction,
  GetUsersFailureAction,
  CreateUserAction,
  CreateUserFailureAction,
  CreateUserSuccessAction,
  UpdateUserAction,
  UpdateUserFailureAction,
  UpdateUserSuccessAction,
  RemoveUserAction,
  RemoveUserFailureAction,
  RemoveUserSuccessAction,
} from "./user.type";

const initState: UserSliceState = {
  getUsersStatus: FetchStatus.IDLE,
  getUsersError: undefined,
  getUsersResponse: undefined,
  createUserStatus: FetchStatus.IDLE,
  createUserError: undefined,
  createUserResponse: undefined,
  updateUserStatus: FetchStatus.IDLE,
  updateUserError: undefined,
  updateUserResponse: undefined,
  removeUserStatus: FetchStatus.IDLE,
  removeUserError: undefined,
  removeUserResponse: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getUsers: (state, _action: GetUsersAction) => {
      state.getUsersStatus = FetchStatus.FETCHING;
      state.getUsersError = "";
    },
    getUsersSuccess: (state, action: GetUsersSuccessAction) => {
      state.getUsersStatus = FetchStatus.SUCCESS;
      state.getUsersResponse = action.payload.response;
    },
    getUsersFailure: (state, action: GetUsersFailureAction) => {
      state.getUsersStatus = FetchStatus.FAILURE;
      state.getUsersError = action.payload.error;
    },

    createUser: (state, _action: CreateUserAction) => {
      state.createUserStatus = FetchStatus.FETCHING;
      state.createUserError = "";
    },
    createUserSuccess: (state, action: CreateUserSuccessAction) => {
      state.createUserStatus = FetchStatus.SUCCESS;
      state.createUserResponse = action.payload.response;
    },
    createUserFailure: (state, action: CreateUserFailureAction) => {
      state.createUserStatus = FetchStatus.FAILURE;
      state.createUserError = action.payload.error;
    },

    updateUser: (state, _action: UpdateUserAction) => {
      state.updateUserStatus = FetchStatus.FETCHING;
      state.updateUserError = "";
    },
    updateUserSuccess: (state, action: UpdateUserSuccessAction) => {
      state.updateUserStatus = FetchStatus.SUCCESS;
      state.updateUserResponse = action.payload.response;
    },
    updateUserFailure: (state, action: UpdateUserFailureAction) => {
      state.updateUserStatus = FetchStatus.FAILURE;
      state.updateUserError = action.payload.error;
    },

    removeUser: (state, _action: RemoveUserAction) => {
      state.removeUserStatus = FetchStatus.FETCHING;
      state.removeUserError = "";
    },
    removeUserSuccess: (state, action: RemoveUserSuccessAction) => {
      state.removeUserStatus = FetchStatus.SUCCESS;
      state.removeUserResponse = action.payload.response;
    },
    removeUserFailure: (state, action: RemoveUserFailureAction) => {
      state.removeUserStatus = FetchStatus.FAILURE;
      state.removeUserError = action.payload.error;
    },

    resetUser: () => {
      return initState;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
