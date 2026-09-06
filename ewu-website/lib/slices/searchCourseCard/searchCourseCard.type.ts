import { BaseAction } from "@lib/action.type";
import {
  GetSearchCourseCardResponse,
  GetSearchCourseCardRequest,
} from "@lib/services/searchCourseCard/searchCourseCard.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface SearchCourseCardSliceState {
  getSearchCourseCardStatus: FetchStatus;
  getSearchCourseCardError?: string;
  getSearchCourseCardResponse?: GetSearchCourseCardResponse;
}

export interface GetSearchCourseCardAction extends BaseAction {
  payload: {
    request: GetSearchCourseCardRequest;
  };
}

export interface GetSearchCourseCardSuccessAction extends BaseAction {
  payload: {
    response: GetSearchCourseCardResponse;
  };
}

export interface GetSearchCourseCardFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
