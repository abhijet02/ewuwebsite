import { Response } from "@/lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { facultyActions } from "./faculty.slice";
import { GetFacultysAction } from "./faculty.type";
import { facultyService } from "@/lib/services/faculty/faculty.service";
import { GetFacultysResponse } from "@/lib/services/faculty/faculty.service.type";

function* getFacultysSaga(action: GetFacultysAction) {
  try {
    const response: Response<GetFacultysResponse> = yield call(
      facultyService.getFacultys,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      facultyActions.getFacultysSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      facultyActions.getFacultysFailure({
        error: errorMessage || "Get facultys failed",
      })
    );
  } finally {
  }
}

export function* getFacultysWatcherSaga() {
  yield takeLatest(facultyActions.getFacultys.type, getFacultysSaga);
}
