import { facultyPersonService } from "@lib/services/facultyPerson/facultyPerson.service";
import { FacultyPerson } from "@lib/services/facultyPerson/facultyPerson.service.type";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { facultyPersonActions } from "./facultyPerson.slice";
import { CreateFacultyPersonAction } from "./facultyPerson.type";

function* createFacultyPersonSaga(action: CreateFacultyPersonAction) {
  try {
    const response: Response<FacultyPerson> = yield call(
      facultyPersonService.createFacultyPerson,
      action.payload.request
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      facultyPersonActions.createfacultyPersonSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      facultyPersonActions.createfacultyPersonFailure({
        error: errorMessage,
      })
    );
  } finally {
  }
}

export function* createFacultyPersonWatcherSaga() {
  yield takeLatest(
    facultyPersonActions.createfacultyPerson.type,
    createFacultyPersonSaga
  );
}
