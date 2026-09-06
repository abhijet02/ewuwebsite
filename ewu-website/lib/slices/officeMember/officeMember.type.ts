import { BaseAction } from "@lib/action.type";
import {
  GetOfficeMembersResponse,
  GetOfficeMembersRequest,
  CreateOfficeMemberRequest,
  UpdateOfficeMemberRequest,
  RemoveOfficeMemberRequest,
  OfficeMember,
} from "@lib/services/officeMember/officeMember.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface OfficeMemberSliceState {
  getOfficeMembersStatus: FetchStatus;
  getOfficeMembersError?: string;
  getOfficeMembersResponse?: GetOfficeMembersResponse;
  createOfficeMemberStatus: FetchStatus;
  createOfficeMemberError?: string;
  createOfficeMemberResponse?: OfficeMember;
  updateOfficeMemberStatus: FetchStatus;
  updateOfficeMemberError?: string;
  updateOfficeMemberResponse?: OfficeMember;
  removeOfficeMemberStatus: FetchStatus;
  removeOfficeMemberError?: string;
  removeOfficeMemberResponse?: OfficeMember;
}

export interface GetOfficeMembersAction extends BaseAction {
  payload: {
    request: GetOfficeMembersRequest;
  };
}

export interface GetOfficeMembersSuccessAction extends BaseAction {
  payload: {
    response: GetOfficeMembersResponse;
  };
}

export interface GetOfficeMembersFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface CreateOfficeMemberAction extends BaseAction {
  payload: {
    request: CreateOfficeMemberRequest;
  };
}

export interface CreateOfficeMemberSuccessAction extends BaseAction {
  payload: {
    response: OfficeMember;
  };
}

export interface CreateOfficeMemberFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface UpdateOfficeMemberAction extends BaseAction {
  payload: {
    request: UpdateOfficeMemberRequest;
  };
}

export interface UpdateOfficeMemberSuccessAction extends BaseAction {
  payload: {
    response: OfficeMember;
  };
}

export interface UpdateOfficeMemberFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface RemoveOfficeMemberAction extends BaseAction {
  payload: {
    request: RemoveOfficeMemberRequest;
  };
}

export interface RemoveOfficeMemberSuccessAction extends BaseAction {
  payload: {
    response: OfficeMember;
  };
}

export interface RemoveOfficeMemberFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
