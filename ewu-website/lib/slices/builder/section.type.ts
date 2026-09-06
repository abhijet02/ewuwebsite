import { BaseAction } from "@lib/action.type";
import {
  GetSectionsResponse,
  GetSectionsRequest,
} from "@lib/services/builder/section.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface SectionSliceState {
  getSectionsStatus: FetchStatus;
  getSectionsError?: string;
  getSectionsResponse?: GetSectionsResponse;
}

export interface GetSectionsAction extends BaseAction {
  payload: {
    request: GetSectionsRequest;
  };
}

export interface GetSectionsSuccessAction extends BaseAction {
  payload: {
    response: GetSectionsResponse;
  };
}

export interface GetSectionsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}