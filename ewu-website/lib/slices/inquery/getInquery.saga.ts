import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetInquerysAction } from "./inquery.type";
import { inqueryActions } from "./inquery.slice";
import { inqueryService } from "../../services/inquery/inquery.service";
import { GetInquerysResponse } from "../../services/inquery/inquery.service.type";

function* getInquerySaga(action: GetInquerysAction) {
  try {
    const response: Response<GetInquerysResponse> = yield call(
      inqueryService.getInquerys,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      inqueryActions.getInquerysSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      inqueryActions.getInquerysFailure({
        error: errorMessage || "Get inquerys failed",
      })
    );
  } finally {
  }
}

export function* getInquerysWatcherSaga() {
  yield takeLatest(inqueryActions.getInquerys.type, getInquerySaga);
}
