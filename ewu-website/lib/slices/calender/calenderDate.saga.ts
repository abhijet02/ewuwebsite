import { GetCalenderDatesResponse } from "@lib/services/calender/calenderDate.service.type";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetCalenderDatesAction } from "./calenderDate.type";
import { calenderDateService } from "@lib/services/calender/calenderDate.service";
import { calenderDateActions } from "./calenderDate.slice";

function* getCalenderDatesSaga(action: GetCalenderDatesAction) {
  try {
    const response: Response<GetCalenderDatesResponse> = yield call(
      calenderDateService.getCalenderDates,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      calenderDateActions.getCalenderDatesSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      calenderDateActions.getCalenderDatesFailure({
        error: errorMessage || "Get calender dates failed",
      })
    );
    // console.log(error);
  } finally {
  }
}

export function* getCalenderDatesWatcherSaga() {
  yield takeLatest(
    calenderDateActions.getCalenderDates.type,
    getCalenderDatesSaga
  );
}
