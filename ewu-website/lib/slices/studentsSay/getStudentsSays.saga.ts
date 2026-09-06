import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { studentsSayActions } from "./studentsSay.slice";
import { GetStudentsSaysAction } from "./studentsSay.type";
import { studentsSayService } from "@lib/services/studentsSay/studentsSay.service";
import { GetStudentsSaysResponse } from "@lib/services/studentsSay/studentsSay.service.type";

function* getStudentsSaysSaga(action: GetStudentsSaysAction) {
  try {
    const response: Response<GetStudentsSaysResponse> = yield call(
      studentsSayService.getStudentsSays,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      studentsSayActions.getStudentsSaysSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      studentsSayActions.getStudentsSaysFailure({
        error: errorMessage || "Get students says failed",
      })
    );
  } finally {
  }
}

export function* getStudentsSaysWatcherSaga() {
  yield takeLatest(
    studentsSayActions.getStudentsSays.type,
    getStudentsSaysSaga
  );
}
