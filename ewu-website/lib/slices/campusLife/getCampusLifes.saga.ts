import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { campusLifeActions } from "./campusLife.slice";
import { GetCampusLifesAction } from "./campusLife.type";
import { campusLifeService } from "@lib/services/campusLife/campusLife.service";
import { GetCampusLifesResponse } from "@lib/services/campusLife/campusLife.service.type";

function* getCampusLifesSaga(action: GetCampusLifesAction) {
  try {
    const response: Response<GetCampusLifesResponse> = yield call(
      campusLifeService.getCampusLifes,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      campusLifeActions.getCampusLifesSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      campusLifeActions.getCampusLifesFailure({
        error: errorMessage || "Get campus lifes failed",
      }),
    );
  } finally {
  }
}

export function* getCampusLifesWatcherSaga() {
  yield takeLatest(campusLifeActions.getCampusLifes.type, getCampusLifesSaga);
}
