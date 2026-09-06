import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { admissionResultActions } from "./admissionResult.slice";
import { GetAdmissionResultsAction } from "./admissionResult.type";
import { admissionResultService } from "@lib/services/admissionResult/admissionResult.service";
import { GetAdmissionResultsResponse } from "@lib/services/admissionResult/admissionResult.service.type";

function* getAdmissionResultsSaga(action: GetAdmissionResultsAction) {
  try {
    const response: Response<GetAdmissionResultsResponse> = yield call(
      admissionResultService.getAdmissionResults,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      admissionResultActions.getAdmissionResultsSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      admissionResultActions.getAdmissionResultsFailure({
        error: errorMessage || "Get admission results failed",
      }),
    );
  } finally {
  }
}

export function* getAdmissionResultsWatcherSaga() {
  yield takeLatest(
    admissionResultActions.getAdmissionResults.type,
    getAdmissionResultsSaga,
  );
}
