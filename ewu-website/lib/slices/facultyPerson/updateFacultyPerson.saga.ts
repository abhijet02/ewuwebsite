import { facultyPersonService } from "@lib/services/facultyPerson/facultyPerson.service";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { UpdateFacultyPersonAction } from "./facultyPerson.type";
import { facultyPersonActions } from "./facultyPerson.slice";
import { FacultyPerson } from "@lib/services/facultyPerson/facultyPerson.service.type";

function* updateFacultyPersonSaga(action: UpdateFacultyPersonAction) {
  try {
    const response: Response<FacultyPerson> = yield call(
      facultyPersonService.updateFacultyPerson,
      action.payload.request
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      facultyPersonActions.updatefacultyPersonSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      facultyPersonActions.updatefacultyPersonFailure({
        error: errorMessage,
      })
    );
  } finally {
  }
}

export function* updateFacultyPersonWatcherSaga() {
  yield takeLatest(
    facultyPersonActions.updatefacultyPerson.type,
    updateFacultyPersonSaga
  );
}
