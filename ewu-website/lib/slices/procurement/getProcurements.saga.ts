import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { procurementActions } from "./procurement.slice";
import { GetProcurementsAction } from "./procurement.type";
import { procurementService } from "@lib/services/procurement/procurement.service";
import { GetProcurementsResponse } from "@lib/services/procurement/procurement.service.type";

function* getProcurementsSaga(action: GetProcurementsAction) {
  try {
    const response: Response<GetProcurementsResponse> = yield call(
      procurementService.getProcurements,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      procurementActions.getProcurementsSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      procurementActions.getProcurementsFailure({
        error: errorMessage || "Get procurements failed",
      })
    );
  } finally {
  }
}

export function* getProcurementsWatcherSaga() {
  yield takeLatest(
    procurementActions.getProcurements.type,
    getProcurementsSaga
  );
}
