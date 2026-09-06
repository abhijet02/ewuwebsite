import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { viewAllActions } from "./viewAll.slice";
import { GetViewAllsAction } from "./viewAll.type";
import { viewAllService } from "@lib/services/viewAll/viewAll.service";
import { GetViewAllsResponse } from "@lib/services/viewAll/viewAll.service.type";

function* getViewAllsSaga(action: GetViewAllsAction) {
  try {
    const response: Response<GetViewAllsResponse> = yield call(
      viewAllService.getViewAlls,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      viewAllActions.getViewAllsSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      viewAllActions.getViewAllsFailure({
        error: errorMessage || "Get ViewAlls failed",
      }),
    );
  } finally {
  }
}

export function* getViewAllsWatcherSaga() {
  yield takeLatest(viewAllActions.getViewAlls.type, getViewAllsSaga);
}
