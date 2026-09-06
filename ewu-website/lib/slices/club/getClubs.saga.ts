import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetClubsAction } from "./club.type";
import { clubActions } from "./club.slice";
import { clubService } from "@lib/services/club/club.service";
import { GetClubsResponse } from "@lib/services/club/club.service.type";

function* getClubsSaga(action: GetClubsAction) {
  try {
    const response: Response<GetClubsResponse> = yield call(
      clubService.getClubs,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      clubActions.getClubsSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      clubActions.getClubsFailure({
        error: errorMessage || "Get clubs failed",
      }),
    );
  } finally {
  }
}

export function* getClubsWatcherSaga() {
  yield takeLatest(clubActions.getClubs.type, getClubsSaga);
}
