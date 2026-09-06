import { BaseAction } from "@/lib/action.type";
import {
  GetDepartmentsResponse,
  GetDepartmentsRequest,
} from "@/lib/services/department/department.service.type";
import { FetchStatus } from "@/lib/services/fetch.type";

export interface DepartmentSliceState {
  getDepartmentsStatus: FetchStatus;
  getDepartmentsError?: string;
  getDepartmentsResponse?: GetDepartmentsResponse;
}

export interface GetDepartmentsAction extends BaseAction {
  payload: {
    request: GetDepartmentsRequest;
  };
}

export interface GetDepartmentsSuccessAction extends BaseAction {
  payload: {
    response: GetDepartmentsResponse;
  };
}

export interface GetDepartmentsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
