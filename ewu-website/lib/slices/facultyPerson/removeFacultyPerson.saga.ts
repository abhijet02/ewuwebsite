import { facultyPersonService } from "@lib/services/facultyPerson/facultyPerson.service";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { RemoveFacultyPersonAction } from "./facultyPerson.type";
import { facultyPersonActions } from "./facultyPerson.slice";
import { FacultyPerson } from "@lib/services/facultyPerson/facultyPerson.service.type";

function* removeFacultyPersonSaga(action: RemoveFacultyPersonAction) {
  try {
    const response: Response<FacultyPerson> = yield call(
      facultyPersonService.removeFacultyPerson,
      action.payload.request
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      facultyPersonActions.removefacultyPersonSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      facultyPersonActions.removefacultyPersonFailure({
        error: errorMessage,
      })
    );
  } finally {
  }
}

export function* removeFacultyPersonWatcherSaga() {
  yield takeLatest(
    facultyPersonActions.removefacultyPerson.type,
    removeFacultyPersonSaga
  );
}
