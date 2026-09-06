import { Response } from "@/lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { latestNewsActions } from "./latestNews.slice";
import { GetLatestNewsAction } from "./latestNews.type";
import { latestNewsService } from "@/lib/services/latestNews/latestNews.service";
import { GetLatestNewsResponse } from "@/lib/services/latestNews/latestNews.service.type";

function* getLatestNewsSaga(action: GetLatestNewsAction) {
  try {
    const response: Response<GetLatestNewsResponse> = yield call(
      latestNewsService.getLatestNews,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      latestNewsActions.getLatestNewsSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      latestNewsActions.getLatestNewsFailure({
        error: errorMessage || "Get latest news failed",
      })
    );
  } finally {
  }
}

export function* getLatestNewsWatcherSaga() {
  yield takeLatest(latestNewsActions.getLatestNews.type, getLatestNewsSaga);
}
