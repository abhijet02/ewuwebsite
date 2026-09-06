import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetYearlyViewsAction } from "./yearlyView.type";
import { yearlyViewActions } from "./yearlyView.slice";
import { yearlyViewService } from "@lib/services/yearlyView/yearlyView.service";
import { GetYearlyViewsResponse } from "@lib/services/yearlyView/yearlyView.service.type";

function* getYearlyViewsSaga(action: GetYearlyViewsAction) {
  try {
    const response: Response<GetYearlyViewsResponse> = yield call(
      yearlyViewService.getYearlyViews,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      yearlyViewActions.getYearlyViewsSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      yearlyViewActions.getYearlyViewsFailure({
        error: errorMessage || "Get yearly views failed",
      }),
    );
  } finally {
  }
}

export function* getYearlyViewsWatcherSaga() {
  yield takeLatest(yearlyViewActions.getYearlyViews.type, getYearlyViewsSaga);
}
