import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetNewsAction, GetNewsBySlugAction } from "./news.type";
import { newsActions } from "./news.slice";
import { newsService } from "@lib/services/news/news.service";
import {
  GetNewsBySlugResponse,
  GetNewsResponse,
} from "@lib/services/news/news.service.type";

function* getNewsSaga(action: GetNewsAction) {
  try {
    const response: Response<GetNewsResponse> = yield call(
      newsService.getNews,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      newsActions.getNewsSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      newsActions.getNewsFailure({
        error: errorMessage || "Get news failed",
      })
    );
  } finally {
  }
}
function* getNewsBySlugSaga(action: GetNewsBySlugAction) {
  try {
    const response: Response<GetNewsBySlugResponse> = yield call(
      newsService.getNewsBySlug,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      newsActions.getNewsBySlugSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      newsActions.getNewsBySlugFailure({
        error: errorMessage || "Get news by slug failed",
      })
    );
  }
}

export function* getNewsWatcherSaga() {
  yield takeLatest(newsActions.getNews.type, getNewsSaga);
  yield takeLatest(newsActions.getNewsBySlug.type, getNewsBySlugSaga);
}
