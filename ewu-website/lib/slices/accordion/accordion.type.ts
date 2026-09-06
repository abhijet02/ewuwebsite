import { BaseAction } from "@lib/action.type";
import {
  GetAccordionsResponse,
  GetAccordionsRequest,
} from "@lib/services/accordion/accordion.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface AccordionSliceState {
  getAccordionsStatus: FetchStatus;
  getAccordionsError?: string;
  getAccordionsResponse?: GetAccordionsResponse;
}

export interface GetAccordionsAction extends BaseAction {
  payload: {
    request: GetAccordionsRequest;
  };
}

export interface GetAccordionsSuccessAction extends BaseAction {
  payload: {
    response: GetAccordionsResponse;
  };
}

export interface GetAccordionsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
