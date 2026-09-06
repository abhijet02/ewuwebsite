import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { footerActions } from "./footer.slice";
import { GetFootersAction } from "./footer.type";
import { footerService } from "@lib/services/footer/footer.service";
import { GetFootersResponse } from "@lib/services/footer/footer.service.type";

function* getFootersKewordSaga(action: GetFootersAction) {
  try {
    const response: Response<GetFootersResponse> = yield call(
      footerService.getFooters,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      footerActions.getFootersSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      footerActions.getFootersFailure({
        error: errorMessage || "Get footers failed",
      }),
    );
  } finally {
  }
}

export function* getFootersWatcherSaga() {
  yield takeLatest(footerActions.getFooters.type, getFootersKewordSaga);
}
