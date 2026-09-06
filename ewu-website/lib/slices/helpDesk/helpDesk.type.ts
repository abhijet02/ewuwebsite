import { BaseAction } from "@lib/action.type";
import {
  GetHelpDesksResponse,
  GetHelpDesksRequest,
} from "@lib/services/helpDesk/helpDesk.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface HelpDeskSliceState {
  getHelpDesksStatus: FetchStatus;
  getHelpDesksError?: string;
  getHelpDesksResponse?: GetHelpDesksResponse;
}

export interface GetHelpDesksAction extends BaseAction {
  payload: {
    request: GetHelpDesksRequest;
  };
}

export interface GetHelpDesksSuccessAction extends BaseAction {
  payload: {
    response: GetHelpDesksResponse;
  };
}

export interface GetHelpDesksFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
