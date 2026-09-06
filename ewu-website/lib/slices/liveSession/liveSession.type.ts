import { BaseAction } from "@lib/action.type";
import {
  GetLiveSessionsResponse,
  GetLiveSessionsRequest,
  CreateLiveSessionRequest,
  UpdateLiveSessionRequest,
  RemoveLiveSessionRequest,
  LiveSession,
} from "@lib/services/liveSession/liveSession.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface LiveSessionSliceState {
  getLiveSessionsStatus: FetchStatus;
  getLiveSessionsError?: string;
  getLiveSessionsResponse?: GetLiveSessionsResponse;
  createLiveSessionStatus: FetchStatus;
  createLiveSessionError?: string;
  createLiveSessionResponse?: LiveSession;
  updateLiveSessionStatus: FetchStatus;
  updateLiveSessionError?: string;
  updateLiveSessionResponse?: LiveSession;
  removeLiveSessionStatus: FetchStatus;
  removeLiveSessionError?: string;
  removeLiveSessionResponse?: LiveSession;
}

export interface GetLiveSessionsAction extends BaseAction {
  payload: {
    request: GetLiveSessionsRequest;
  };
}

export interface GetLiveSessionsSuccessAction extends BaseAction {
  payload: {
    response: GetLiveSessionsResponse;
  };
}

export interface GetLiveSessionsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface CreateLiveSessionAction extends BaseAction {
  payload: {
    request: CreateLiveSessionRequest;
  };
}

export interface CreateLiveSessionSuccessAction extends BaseAction {
  payload: {
    response: LiveSession;
  };
}

export interface CreateLiveSessionFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface UpdateLiveSessionAction extends BaseAction {
  payload: {
    request: UpdateLiveSessionRequest;
  };
}

export interface UpdateLiveSessionSuccessAction extends BaseAction {
  payload: {
    response: LiveSession;
  };
}

export interface UpdateLiveSessionFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface RemoveLiveSessionAction extends BaseAction {
  payload: {
    request: RemoveLiveSessionRequest;
  };
}

export interface RemoveLiveSessionSuccessAction extends BaseAction {
  payload: {
    response: LiveSession;
  };
}

export interface RemoveLiveSessionFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
