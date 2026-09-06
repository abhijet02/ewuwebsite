import { BaseAction } from "@lib/action.type";
import {
  GetEventsResponse,
  GetEventsRequest,
} from "@lib/services/event/event.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface EventsSliceState {
  getEventStatus: FetchStatus;
  getEventError?: string;
  getEventResponse?: GetEventsResponse;
}

export interface GetEventsAction extends BaseAction {
  payload: {
    request: GetEventsRequest;
  };
}

export interface GetEventsSuccessAction extends BaseAction {
  payload: {
    response: GetEventsResponse;
  };
}

export interface GetEventsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
