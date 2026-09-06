import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetHotlineAction } from "./Hotline.type";
import { hotlineActions } from "./Hotline.slice";
import { hotlineService } from "@lib/services/hotline/hotline.service";
import { GetHotlineResponse } from "@lib/services/hotline/hotline.service.type";

function* getHotlineSaga(action: GetHotlineAction) {
  try {
    const response: Response<GetHotlineResponse> = yield call(
      hotlineService.getHotline,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      hotlineActions.getHotlineSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      hotlineActions.getHotlineFailure({
        error: errorMessage || "Get hotline failed",
      }),
    );
  } finally {
  }
}

export function* getHotlineWatcherSaga() {
  yield takeLatest(hotlineActions.getHotline.type, getHotlineSaga);
}
