import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { helpDeskActions } from "./helpDesk.slice";
import { GetHelpDesksAction } from "./helpDesk.type";
import { helpDeskService } from "@lib/services/helpDesk/helpDesk.service";
import { GetHelpDesksResponse } from "@lib/services/helpDesk/helpDesk.service.type";

function* getHelpDesksSaga(action: GetHelpDesksAction) {
  try {
    const response: Response<GetHelpDesksResponse> = yield call(
      helpDeskService.getHelpDesks,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      helpDeskActions.getHelpDesksSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      helpDeskActions.getHelpDesksFailure({
        error: errorMessage || "Get helpDesks failed",
      })
    );
  } finally {
  }
}

export function* getHelpDesksWatcherSaga() {
  yield takeLatest(helpDeskActions.getHelpDesks.type, getHelpDesksSaga);
}
