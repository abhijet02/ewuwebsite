import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { alumniActions } from "./alumni.slice";
import { GetAlumnisAction } from "./alumni.type";
import { alumniService } from "@lib/services/alumni/alumni.service";
import { GetAlumniResponse } from "@lib/services/alumni/alumni.service.type";

function* getAlumniSaga(action: GetAlumnisAction) {
  try {
    const response: Response<GetAlumniResponse> = yield call(
      alumniService.getAlumni,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      alumniActions.getAlumniSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      alumniActions.getAlumniFailure({
        error: errorMessage || "Get alumni failed",
      }),
    );
  } finally {
  }
}

export function* getAlumniWatcherSaga() {
  yield takeLatest(alumniActions.getAlumni.type, getAlumniSaga);
}
