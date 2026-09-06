import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetNewsMediaAction } from "./newsMedia.type";
import { newsMediaActions } from "./newsMedia.slice";
import { newsMediaService } from "@lib/services/newsMedia/newsMedia.service";
import { GetNewsMediaResponse } from "@lib/services/newsMedia/newsMedia.service.type";

function* getNewsMediaSaga(action: GetNewsMediaAction) {
  try {
    const response: Response<GetNewsMediaResponse> = yield call(
      newsMediaService.getNewsMedia,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      newsMediaActions.getNewsMediaSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      newsMediaActions.getNewsMediaFailure({
        error: errorMessage || "Get news media failed",
      }),
    );
  } finally {
  }
}

export function* getNewsMediaWatcherSaga() {
  yield takeLatest(newsMediaActions.getNewsMedia.type, getNewsMediaSaga);
}
