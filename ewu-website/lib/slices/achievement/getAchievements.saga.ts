import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetAchievementsAction } from "./achievement.type";
import { achievementActions } from "./achievement.slice";
import { achievementService } from "@lib/services/achievement/achievement.service";
import { GetAchievementsResponse } from "@lib/services/achievement/achievement.service.type";

function* getAchievementsSaga(action: GetAchievementsAction) {
  try {
    const response: Response<GetAchievementsResponse> = yield call(
      achievementService.getAchievements,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      achievementActions.getAchievementsSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      achievementActions.getAchievementsFailure({
        error: errorMessage || "Get achievements failed",
      })
    );
  } finally {
  }
}

export function* getAchievementsWatcherSaga() {
  yield takeLatest(
    achievementActions.getAchievements.type,
    getAchievementsSaga
  );
}
