import { BaseAction } from "@lib/action.type";
import {
  GetProgramCardResponse,
  GetProgramCardRequest,
} from "@lib/services/programCard/programCard.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface ProgramCardSliceState {
  getProgramCardStatus: FetchStatus;
  getProgramCardError?: string;
  getProgramCardResponse?: GetProgramCardResponse;
}

export interface GetProgramCardAction extends BaseAction {
  payload: {
    request: GetProgramCardRequest;
  };
}

export interface GetProgramCardSuccessAction extends BaseAction {
  payload: {
    response: GetProgramCardResponse;
  };
}

export interface GetProgramCardFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
