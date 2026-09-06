import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { UpdateInqueryAction } from "./inquery.type";
import { inqueryActions } from "./inquery.slice";
import { Inquery } from "@lib/services/inquery/inquery.service.type";
import { inqueryService } from "@lib/services/inquery/inquery.service";

function* updateInquerySaga(action: UpdateInqueryAction) {
  try {
    const response: Response<Inquery> = yield call(
      inqueryService.updateInquery,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      inqueryActions.updateInquerySuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      inqueryActions.updateInqueryFailure({
        error: errorMessage || "Update inquery failed",
      })
    );
  } finally {
  }
}

export function* updateInqueryWatcherSaga() {
  yield takeLatest(inqueryActions.updateInquery.type, updateInquerySaga);
}
