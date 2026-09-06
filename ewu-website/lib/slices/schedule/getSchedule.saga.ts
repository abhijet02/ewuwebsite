import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { scheduleActions } from "./schedule.slice";
import { GetSchedulesAction } from "./schedule.type";
import { GetSchedulesResponse } from "@lib/services/schedule/schedule.service.type";
import { scheduleService } from "@lib/services/schedule/schedule.service";

function* getSchedulesSaga(action: GetSchedulesAction) {
  try {
    const response: Response<GetSchedulesResponse> = yield call(
      scheduleService.getSchedules,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      scheduleActions.getSchedulesSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      scheduleActions.getSchedulesFailure({
        error: errorMessage || "Get schedules failed",
      }),
    );
  } finally {
  }
}

export function* getSchedulesWatcherSaga() {
  yield takeLatest(scheduleActions.getSchedules.type, getSchedulesSaga);
}
