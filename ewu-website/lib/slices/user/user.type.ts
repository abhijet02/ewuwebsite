import { BaseAction } from "@lib/action.type";
import {
  GetUsersResponse,
  GetUsersRequest,
  CreateUserRequest,
  UpdateUserRequest,
  RemoveUserRequest,
  User,
} from "@lib/services/user/user.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface UserSliceState {
  getUsersStatus: FetchStatus;
  getUsersError?: string;
  getUsersResponse?: GetUsersResponse;
  createUserStatus: FetchStatus;
  createUserError?: string;
  createUserResponse?: User;
  updateUserStatus: FetchStatus;
  updateUserError?: string;
  updateUserResponse?: User;
  removeUserStatus: FetchStatus;
  removeUserError?: string;
  removeUserResponse?: User;
}

export interface GetUsersAction extends BaseAction {
  payload: {
    request: GetUsersRequest;
  };
}

export interface GetUsersSuccessAction extends BaseAction {
  payload: {
    response: GetUsersResponse;
  };
}

export interface GetUsersFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface CreateUserAction extends BaseAction {
  payload: {
    request: CreateUserRequest;
  };
}

export interface CreateUserSuccessAction extends BaseAction {
  payload: {
    response: User;
  };
}

export interface CreateUserFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface UpdateUserAction extends BaseAction {
  payload: {
    request: UpdateUserRequest;
  };
}

export interface UpdateUserSuccessAction extends BaseAction {
  payload: {
    response: User;
  };
}

export interface UpdateUserFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface RemoveUserAction extends BaseAction {
  payload: {
    request: RemoveUserRequest;
  };
}

export interface RemoveUserSuccessAction extends BaseAction {
  payload: {
    response: User;
  };
}

export interface RemoveUserFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
