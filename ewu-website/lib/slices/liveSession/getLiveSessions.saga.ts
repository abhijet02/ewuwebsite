import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { liveSessionActions } from "./liveSession.slice";
import { GetLiveSessionsAction } from "./liveSession.type";
import { liveSessionService } from "@lib/services/liveSession/liveSession.service";
import { GetLiveSessionsResponse } from "@lib/services/liveSession/liveSession.service.type";

function* getLiveSessionsSaga(action: GetLiveSessionsAction) {
  try {
    const response: Response<GetLiveSessionsResponse> = yield call(
      liveSessionService.getLiveSessions,
      action.payload.request,
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      liveSessionActions.getLiveSessionsSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      liveSessionActions.getLiveSessionsFailure({
        error: errorMessage,
      }),
    );
  } finally {
  }
}

export function* getLiveSessionsWatcherSaga() {
  yield takeLatest(
    liveSessionActions.getLiveSessions.type,
    getLiveSessionsSaga,
  );
}
