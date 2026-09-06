import { BaseAction } from "@lib/action.type";
import {
  GetProcurementsResponse,
  GetProcurementsRequest,
} from "@lib/services/procurement/procurement.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface ProcurementSliceState {
  getProcurementsStatus: FetchStatus;
  getProcurementsError?: string;
  getProcurementsResponse?: GetProcurementsResponse;
}

export interface GetProcurementsAction extends BaseAction {
  payload: {
    request: GetProcurementsRequest;
  };
}

export interface GetProcurementsSuccessAction extends BaseAction {
  payload: {
    response: GetProcurementsResponse;
  };
}

export interface GetProcurementsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
