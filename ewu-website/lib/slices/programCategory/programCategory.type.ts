import { BaseAction } from "@lib/action.type";
import {
  GetProgramCategoriesResponse,
  GetProgramCategoriesRequest,
} from "@lib/services/programCategory/programCategory.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface ProgramCategorySliceState {
  getProgramCategoriesStatus: FetchStatus;
  getProgramCategoriesError?: string;
  getProgramCategoriesResponse?: GetProgramCategoriesResponse;
}

export interface GetProgramCategoriesAction extends BaseAction {
  payload: {
    request: GetProgramCategoriesRequest;
  };
}

export interface GetProgramCategoriesSuccessAction extends BaseAction {
  payload: {
    response: GetProgramCategoriesResponse;
  };
}

export interface GetProgramCategoriesFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
