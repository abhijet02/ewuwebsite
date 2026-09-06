import {
  SemesterCalender,
  GetSemesterCalendersResponse,
} from "@lib/services/calender/semesterCalender.service.type";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetSemesterCalendersAction } from "./semesterCalender.type";
import { semesterCalenderService } from "@lib/services/calender/semesterCalender.service";
import { semesterCalenderActions } from "./semesterCalender.slice";

function* getSemesterCalendersSaga(action: GetSemesterCalendersAction) {
  try {
    const response: Response<GetSemesterCalendersResponse> = yield call(
      semesterCalenderService.getSemesterCalenders,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      semesterCalenderActions.getSemesterCalendersSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      semesterCalenderActions.getSemesterCalendersFailure({
        error: errorMessage || "Get semester calenders failed",
      })
    );
    // console.log(error);
  } finally {
  }
}

export function* getSemesterCalendersWatcherSaga() {
  yield takeLatest(
    semesterCalenderActions.getSemesterCalenders.type,
    getSemesterCalendersSaga
  );
}
