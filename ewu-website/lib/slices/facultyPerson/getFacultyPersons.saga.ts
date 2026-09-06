import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetFacultyPersonAction } from "./facultyPerson.type";
import { facultyPersonActions } from "./facultyPerson.slice";
import { facultyPersonService } from "@lib/services/facultyPerson/facultyPerson.service";
import { GetFacultyPersonResponse } from "@lib/services/facultyPerson/facultyPerson.service.type";

function* getFacultyPersonSaga(action: GetFacultyPersonAction) {
  try {
    const response: Response<GetFacultyPersonResponse> = yield call(
      facultyPersonService.getFacultyPersons,
      action.payload.request
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      facultyPersonActions.getfacultyPersonSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      facultyPersonActions.getfacultyPersonFailure({
        error: errorMessage,
      })
    );
  } finally {
  }
}

export function* getFacultyPersonWatcherSaga() {
  yield takeLatest(
    facultyPersonActions.getFacultyPersons.type,
    getFacultyPersonSaga
  );
}
