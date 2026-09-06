import { inqueryService } from "@lib/services/inquery/inquery.service";
import { Inquery } from "@lib/services/inquery/inquery.service.type";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { inqueryActions } from "./inquery.slice";
import { CreateInqueryAction } from "./inquery.type";

function* createInquerySaga(action: CreateInqueryAction) {
  try {
    const response: Response<Inquery> = yield call(
      inqueryService.createInquery,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      inqueryActions.createInquerySuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      inqueryActions.createInqueryFailure({
        error: errorMessage || "Create inquery failed",
      })
    );
  } finally {
  }
}

export function* createInqueryWatcherSaga() {
  yield takeLatest(inqueryActions.createInquery.type, createInquerySaga);
}
