import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { headerActions } from "./header.slice";
import { GetHeadersAction } from "./header.type";
import { headerService } from "@lib/services/header/header.service";
import { GetHeadersResponse } from "@lib/services/header/header.service.type";

function* getHeadersKewordSaga(action: GetHeadersAction) {
  try {
    const response: Response<GetHeadersResponse> = yield call(
      headerService.getHeaders,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      headerActions.getHeadersSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      headerActions.getHeadersFailure({
        error: errorMessage || "Get headers failed",
      })
    );
  } finally {
  }
}

export function* getHeadersWatcherSaga() {
  yield takeLatest(headerActions.getHeaders.type, getHeadersKewordSaga);
}
