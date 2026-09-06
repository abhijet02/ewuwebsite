import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { programActions } from "./program.slice";
import { GetProgramsAction } from "./program.type";
import { programService } from "@lib/services/program/program.service";
import { GetProgramsResponse } from "@lib/services/program/program.service.type";

function* getProgramsSaga(action: GetProgramsAction) {
  try {
    const response: Response<GetProgramsResponse> = yield call(
      programService.getPrograms,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      programActions.getProgramsSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      programActions.getProgramsFailure({
        error: errorMessage || "Get programs failed",
      })
    );
  } finally {
  }
}

export function* getProgramsWatcherSaga() {
  yield takeLatest(programActions.getPrograms.type, getProgramsSaga);
}
