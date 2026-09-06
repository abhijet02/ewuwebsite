import { BaseAction } from "@lib/action.type";
import {
  GetPartnershipsResponse,
  GetPartnershipsRequest,
} from "@lib/services/partnership/partnership.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface PartnershipSliceState {
  getPartnershipStatus: FetchStatus;
  getPartnershipError?: string;
  getPartnershipResponse?: GetPartnershipsResponse;
}

export interface GetPartnershipsAction extends BaseAction {
  payload: {
    request: GetPartnershipsRequest;
  };
}

export interface GetPartnershipsSuccessAction extends BaseAction {
  payload: {
    response: GetPartnershipsResponse;
  };
}

export interface GetPartnershipsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
