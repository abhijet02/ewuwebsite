import { Response } from "@/lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { quickLinkActions } from "./quickLink.slice";
import { GetQuickLinkAction } from "./quickLink.type";
import { quickLinkService } from "@/lib/services/quickLink/quickLink.service";
import { GetQuickLinkResponse } from "@/lib/services/quickLink/quickLink.service.type";

function* getQuickLinkSaga(action: GetQuickLinkAction) {
  try {
    const response: Response<GetQuickLinkResponse> = yield call(
      quickLinkService.getQuickLink,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      quickLinkActions.getQuickLinkSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      quickLinkActions.getQuickLinkFailure({
        error: errorMessage || "Get quick links failed",
      })
    );
  } finally {
  }
}

export function* getQuickLinkWatcherSaga() {
  yield takeLatest(quickLinkActions.getQuickLink.type, getQuickLinkSaga);
}
