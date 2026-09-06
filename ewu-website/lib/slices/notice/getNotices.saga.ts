import { Response } from "@/lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetNoticesAction } from "./notice.type";
import { noticeActions } from "./notice.slice";
import { noticeService } from "@/lib/services/notice/notice.service";
import { GetNoticesResponse } from "@/lib/services/notice/notice.service.type";

function* getNoticesSaga(action: GetNoticesAction) {
  try {
    const response: Response<GetNoticesResponse> = yield call(
      noticeService.getNotices,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      noticeActions.getNoticesSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      noticeActions.getNoticesFailure({
        error: errorMessage || "Get notices failed",
      })
    );
  } finally {
  }
}

export function* getNoticesWatcherSaga() {
  yield takeLatest(noticeActions.getNotices.type, getNoticesSaga);
}
