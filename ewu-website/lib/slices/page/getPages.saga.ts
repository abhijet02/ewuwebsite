import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { pageActions } from "./page.slice";
import { GetPageByLinkAction, GetPagesAction } from "./page.type";
import { pageService } from "@lib/services/page/page.service";
import { GetPageByLinkResponse, GetPagesResponse } from "@lib/services/page/page.service.type";

function* getPagesSaga(action: GetPagesAction) {
  try {
    const response: Response<GetPagesResponse> = yield call(
      pageService.getPages,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      pageActions.getPagesSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      pageActions.getPagesFailure({
        error: errorMessage || "Get pages failed",
      }),
    );
  } finally {
  }
}

function* getPageByLinkSaga(action: GetPageByLinkAction) {
  try {
    const response: Response<GetPageByLinkResponse> = yield call(
      pageService.getPageByLink,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      pageActions.getPageByLinkSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      pageActions.getPageByLinkFailure({
        error: errorMessage || "Get pages failed",
      }),
    );
  } finally {
  }
}

export function* getPagesWatcherSaga() {
  yield takeLatest(pageActions.getPages.type, getPagesSaga);
  yield takeLatest(pageActions.getPageByLink.type, getPageByLinkSaga);
}
