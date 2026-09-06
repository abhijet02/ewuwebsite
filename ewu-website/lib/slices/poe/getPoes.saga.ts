import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { poeActions } from "./poe.slice";
import { GetPoesAction } from "./poe.type";
import { poeService } from "@lib/services/poe/poe.service";
import { GetPoesResponse } from "@lib/services/poe/poe.service.type";

function* getPoesSaga(action: GetPoesAction) {
  try {
    const response: Response<GetPoesResponse> = yield call(
      poeService.getPoes,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      poeActions.getPoesSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      poeActions.getPoesFailure({
        error: errorMessage || "Get poes failed",
      })
    );
  } finally {
  }
}

export function* getPoesWatcherSaga() {
  yield takeLatest(poeActions.getPoes.type, getPoesSaga);
}
