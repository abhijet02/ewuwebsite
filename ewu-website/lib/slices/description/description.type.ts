import { BaseAction } from "@lib/action.type";
import { 
  GetDescriptionsRequest, 
  GetDescriptionsResponse, 
} from "@lib/services/description/description.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface DescriptionSliceState {
  getDescriptionStatus: FetchStatus;
  getDescriptionError?: string;
  getDescriptionResponse?: GetDescriptionsResponse;
}

export interface GetDescriptionsAction extends BaseAction {
  payload: {
    request: GetDescriptionsRequest;
  };
}

export interface GetDescriptionSuccessAction extends BaseAction {
  payload: {
    response: GetDescriptionsResponse;
  };
}

export interface GetDescriptionFailureAction extends BaseAction {
  payload: {
    error: string;
  };

}
