import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetClubActivityRankingsAction } from "./clubActivityRanking.type";
import { clubActivityRankingActions } from "./clubActivityRanking.slice";
import { clubActivityRankingService } from "@lib/services/club/clubActivityRanking.service";
import { GetClubActivityRankingsResponse } from "@lib/services/club/clubActivityRanking.service.type";

function* getClubActivityRankingsSaga(action: GetClubActivityRankingsAction) {
  try {
    const response: Response<GetClubActivityRankingsResponse> = yield call(
      clubActivityRankingService.getClubActivityRankings,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      clubActivityRankingActions.getClubActivityRankingsSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      clubActivityRankingActions.getClubActivityRankingsFailure({
        error: errorMessage || "Get club activity rankings failed",
      })
    );
  } finally {
  }
}

export function* getClubActivityRankingsWatcherSaga() {
  yield takeLatest(
    clubActivityRankingActions.getClubActivityRankings.type,
    getClubActivityRankingsSaga
  );
}
