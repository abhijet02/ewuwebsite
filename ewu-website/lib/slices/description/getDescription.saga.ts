import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetDescriptionsAction } from "./description.type";
import { descriptionActions } from "./description.slice";
import { GetDescriptionsResponse } from "@lib/services/description/description.service.type";
import { descriptionService } from "@lib/services/description/description.service";

function* getDescriptionSaga(action: GetDescriptionsAction) {
  try {
    const response: Response<GetDescriptionsResponse> = yield call(
      descriptionService.getDescriptions,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      descriptionActions.getDescriptionsSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      descriptionActions.getDescriptionsFailure({
        error: errorMessage || "Get events failed",
      }),
    );
  } finally {
  }
}

export function* getDescriptionWatcherSaga() {
  yield takeLatest(descriptionActions.getDescriptions.type, getDescriptionSaga);
}
