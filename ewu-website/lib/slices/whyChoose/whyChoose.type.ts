import { BaseAction } from "@lib/action.type";
import {
  GetWhyChoosesResponse,
  GetWhyChoosesRequest,
} from "@lib/services/whyChoose/whyChoose.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface WhyChooseSliceState {
  getWhyChoosesStatus: FetchStatus;
  getWhyChoosesError?: string;
  getWhyChoosesResponse?: GetWhyChoosesResponse;
}

export interface GetWhyChoosesAction extends BaseAction {
  payload: {
    request: GetWhyChoosesRequest;
  };
}

export interface GetWhyChoosesSuccessAction extends BaseAction {
  payload: {
    response: GetWhyChoosesResponse;
  };
}

export interface GetWhyChoosesFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
