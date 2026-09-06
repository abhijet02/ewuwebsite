import { BaseAction } from "@lib/action.type";
import {
  GetSkillsResponse,
  GetSkillsRequest,
} from "@lib/services/skill/skill.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface SkillSliceState {
  getSkillsStatus: FetchStatus;
  getSkillsError?: string;
  getSkillsResponse?: GetSkillsResponse;
}

export interface GetSkillsAction extends BaseAction {
  payload: {
    request: GetSkillsRequest;
  };
}

export interface GetSkillsSuccessAction extends BaseAction {
  payload: {
    response: GetSkillsResponse;
  };
}

export interface GetSkillsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
