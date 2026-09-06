import { BaseAction } from "@lib/action.type";
import {
  GetClubMembersResponse,
  GetClubMembersRequest,
  CreateClubMemberRequest,
  UpdateClubMemberRequest,
  RemoveClubMemberRequest,
  ClubMember,
} from "@lib/services/clubMember/clubMember.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface ClubMemberSliceState {
  getClubMembersStatus: FetchStatus;
  getClubMembersError?: string;
  getClubMembersResponse?: GetClubMembersResponse;
  createClubMemberStatus: FetchStatus;
  createClubMemberError?: string;
  createClubMemberResponse?: ClubMember;
  updateClubMemberStatus: FetchStatus;
  updateClubMemberError?: string;
  updateClubMemberResponse?: ClubMember;
  removeClubMemberStatus: FetchStatus;
  removeClubMemberError?: string;
  removeClubMemberResponse?: ClubMember;
}

export interface GetClubMembersAction extends BaseAction {
  payload: {
    request: GetClubMembersRequest;
  };
}

export interface GetClubMembersSuccessAction extends BaseAction {
  payload: {
    response: GetClubMembersResponse;
  };
}

export interface GetClubMembersFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface CreateClubMemberAction extends BaseAction {
  payload: {
    request: CreateClubMemberRequest;
  };
}

export interface CreateClubMemberSuccessAction extends BaseAction {
  payload: {
    response: ClubMember;
  };
}

export interface CreateClubMemberFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface UpdateClubMemberAction extends BaseAction {
  payload: {
    request: UpdateClubMemberRequest;
  };
}

export interface UpdateClubMemberSuccessAction extends BaseAction {
  payload: {
    response: ClubMember;
  };
}

export interface UpdateClubMemberFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface RemoveClubMemberAction extends BaseAction {
  payload: {
    request: RemoveClubMemberRequest;
  };
}

export interface RemoveClubMemberSuccessAction extends BaseAction {
  payload: {
    response: ClubMember;
  };
}

export interface RemoveClubMemberFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
