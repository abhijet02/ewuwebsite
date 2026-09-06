import { GetSemestersResponse } from "@lib/services/semester/semester.service.type";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetSemestersAction } from "./semester.type";
import { semesterService } from "@lib/services/semester/semester.service";
import { semesterActions } from "./semester.slice";

function* getSemestersSaga(action: GetSemestersAction) {
  try {
    const response: Response<GetSemestersResponse> = yield call(
      semesterService.getSemesters,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      semesterActions.getSemestersSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      semesterActions.getSemestersFailure({
        error: errorMessage || "Get semester calenders failed",
      })
    );
    // console.log(error);
  } finally {
  }
}

export function* getSemestersWatcherSaga() {
  yield takeLatest(semesterActions.getSemesters.type, getSemestersSaga);
}
