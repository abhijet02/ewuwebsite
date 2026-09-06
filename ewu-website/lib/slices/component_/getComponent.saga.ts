import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { componentActions } from "./component.slice";
import { GetComponentAction } from "./component.type";
import { componentService } from "@lib/services/component_/component.service";
import { GetComponentResponse } from "@lib/services/component_/component.service.type";

function* getComponentSaga(action: GetComponentAction) {
  try {
    const response: Response<GetComponentResponse> = yield call(
      componentService.getComponent,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      componentActions.getComponentSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      componentActions.getComponentFailure({
        error: errorMessage || "Get components failed",
      }),
    );
  } finally {
  }
}

export function* getComponentWatcherSaga() {
  yield takeLatest(componentActions.getComponent.type, getComponentSaga);
}
