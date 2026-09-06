import { builderService } from "@lib/services/builder/builder.service";
import { GetBuildersResponse } from "@lib/services/builder/builder.service.type";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { builderActions } from "./builder.slice";
import { GetBuildersAction } from "./builder.type";

function* getBuildersSaga(action: GetBuildersAction) {
  try {
    const response: Response<GetBuildersResponse> = yield call(
      builderService.getBuilders,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      builderActions.getBuildersSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      builderActions.getBuildersFailure({
        error: errorMessage || "Get builders failed",
      })
    );
    // console.log(error);
  } finally {
  }
}

export function* getBuildersWatcherSaga() {
  yield takeLatest(builderActions.getBuilders.type, getBuildersSaga);
}
