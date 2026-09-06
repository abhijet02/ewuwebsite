import {
  ProgramCalender,
  GetProgramCalendersResponse,
} from "@lib/services/calender/programCalender.service.type";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetProgramCalendersAction } from "./programCalender.type";
import { programCalenderService } from "@lib/services/calender/programCalender.service";
import { programCalenderActions } from "./programCalender.slice";

function* getProgramCalendersSaga(action: GetProgramCalendersAction) {
  try {
    const response: Response<GetProgramCalendersResponse> = yield call(
      programCalenderService.getProgramCalenders,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      programCalenderActions.getProgramCalendersSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      programCalenderActions.getProgramCalendersFailure({
        error: errorMessage || "Get program calenders failed",
      })
    );
    // console.log(error);
  } finally {
  }
}

export function* getProgramCalendersWatcherSaga() {
  yield takeLatest(
    programCalenderActions.getProgramCalenders.type,
    getProgramCalendersSaga
  );
}
