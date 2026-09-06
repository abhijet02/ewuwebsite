import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { whyChooseActions } from "./whyChoose.slice";
import { GetWhyChoosesAction } from "./whyChoose.type";
import { whyChooseService } from "@lib/services/whyChoose/whyChoose.service";
import { GetWhyChoosesResponse } from "@lib/services/whyChoose/whyChoose.service.type";

function* getWhyChoosesSaga(action: GetWhyChoosesAction) {
  try {
    const response: Response<GetWhyChoosesResponse> = yield call(
      whyChooseService.getWhyChooses,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      whyChooseActions.getWhyChoosesSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      whyChooseActions.getWhyChoosesFailure({
        error: errorMessage || "Get why chooses failed",
      })
    );
  } finally {
  }
}

export function* getWhyChoosesWatcherSaga() {
  yield takeLatest(whyChooseActions.getWhyChooses.type, getWhyChoosesSaga);
}
