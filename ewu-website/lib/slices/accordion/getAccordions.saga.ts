import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { accordionActions } from "./accordion.slice";
import { GetAccordionsAction } from "./accordion.type";
import { accordionService } from "@lib/services/accordion/accordion.service";
import { GetAccordionsResponse } from "@lib/services/accordion/accordion.service.type";

function* getAccordionsSaga(action: GetAccordionsAction) {
  try {
    const response: Response<GetAccordionsResponse> = yield call(
      accordionService.getAccordions,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      accordionActions.getAccordionsSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      accordionActions.getAccordionsFailure({
        error: errorMessage || "Get accordions failed",
      }),
    );
  } finally {
  }
}

export function* getAccordionsWatcherSaga() {
  yield takeLatest(accordionActions.getAccordions.type, getAccordionsSaga);
}
