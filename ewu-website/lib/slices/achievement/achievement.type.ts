import { BaseAction } from "@lib/action.type";
import {
  GetAchievementsResponse,
  GetAchievementsRequest,
} from "@lib/services/achievement/achievement.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface AchievementSliceState {
  getAchievementsStatus: FetchStatus;
  getAchievementsError?: string;
  getAchievementsResponse?: GetAchievementsResponse;
}

export interface GetAchievementsAction extends BaseAction {
  payload: {
    request: GetAchievementsRequest;
  };
}

export interface GetAchievementsSuccessAction extends BaseAction {
  payload: {
    response: GetAchievementsResponse;
  };
}

export interface GetAchievementsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
