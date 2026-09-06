import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetSuccessCardAction } from "./successCard.type";
import { successCardActions } from "./successCard.slice";
import { successCardService } from "@lib/services/successCard/successCard.service";
import { GetSuccessCardResponse } from "@lib/services/successCard/successCard.service.type";

function* getSuccessCardSaga(action: GetSuccessCardAction) {
  try {
    const response: Response<GetSuccessCardResponse> = yield call(
      successCardService.getSuccessCard,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      successCardActions.getSuccessCardSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      successCardActions.getSuccessCardFailure({
        error: errorMessage || "Get Success Card failed",
      }),
    );
  } finally {
  }
}

export function* getSuccessCardWatcherSaga() {
  yield takeLatest(successCardActions.getSuccessCard.type, getSuccessCardSaga);
}
