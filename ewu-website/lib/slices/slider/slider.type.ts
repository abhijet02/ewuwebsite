import { BaseAction } from "@lib/action.type";
import {
  GetSlidersResponse,
  GetSlidersRequest,
} from "@lib/services/slider/slider.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface SliderSliceState {
  getSlidersStatus: FetchStatus;
  getSlidersError?: string;
  getSlidersResponse?: GetSlidersResponse;
  isVideoMuted: boolean;
}

export interface GetSlidersAction extends BaseAction {
  payload: {
    request: GetSlidersRequest;
  };
}

export interface GetSlidersSuccessAction extends BaseAction {
  payload: {
    response: GetSlidersResponse;
  };
}

export interface GetSlidersFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

// Add new actions for video mute control
export interface SetVideoMutedAction extends BaseAction {
  payload: {
    isMuted: boolean;
  };
}

export interface ToggleVideoMutedAction extends BaseAction {}
