import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetProgramCardAction } from "./programCard.type";
import { programCardActions } from "./programCard.slice";
import { programCardService } from "@lib/services/programCard/programCard.service";
import { GetProgramCardResponse } from "@lib/services/programCard/programCard.service.type";

function* getProgramCardSaga(action: GetProgramCardAction) {
  try {
    const response: Response<GetProgramCardResponse> = yield call(
      programCardService.getProgramCard,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      programCardActions.getProgramCardSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      programCardActions.getProgramCardFailure({
        error: errorMessage || "Get Program Card failed",
      }),
    );
  } finally {
  }
}

export function* getProgramCardWatcherSaga() {
  yield takeLatest(programCardActions.getProgramCard.type, getProgramCardSaga);
}
