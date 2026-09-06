import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { RemoveInqueryAction } from "./inquery.type";
import { Inquery } from "@lib/services/inquery/inquery.service.type";
import { inqueryService } from "@lib/services/inquery/inquery.service";
import { inqueryActions } from "./inquery.slice";

function* removeEventSaga(action: RemoveInqueryAction) {
  try {
    const response: Response<Inquery> = yield call(
      inqueryService.removeInquery,
      action.payload.request
    );
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      inqueryActions.removeInquerySuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      inqueryActions.removeInqueryFailure({
        error: errorMessage || "Delete inquery failed",
      })
    );
  } finally {
  }
}

export function* removeInqueryWatcherSaga() {
  yield takeLatest(inqueryActions.removeInquery.type, removeEventSaga);
}
