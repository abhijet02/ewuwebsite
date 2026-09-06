import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { officeActions } from "./office.slice";
import { GetOfficesAction } from "./office.type";
import { officeService } from "@lib/services/office/office.service";
import { GetOfficesResponse } from "@lib/services/office/office.service.type";

function* getOfficesSaga(action: GetOfficesAction) {
  try {
    const response: Response<GetOfficesResponse> = yield call(
      officeService.getOffices,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      officeActions.getOfficesSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      officeActions.getOfficesFailure({
        error: errorMessage || "Get offices failed",
      }),
    );
  } finally {
  }
}

export function* getOfficesWatcherSaga() {
  yield takeLatest(officeActions.getOffices.type, getOfficesSaga);
}
