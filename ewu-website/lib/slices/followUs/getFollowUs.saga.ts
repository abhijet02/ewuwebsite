import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetFollowUsAction } from "./FollowUs.type";
import { followUsActions } from "./FollowUs.slice";
import { followUsService } from "@lib/services/followUs/followUs.service";
import { GetFollowUsResponse } from "@lib/services/followUs/followUs.service.type";

function* getFollowUsSaga(action: GetFollowUsAction) {
  try {
    const response: Response<GetFollowUsResponse> = yield call(
      followUsService.getFollowUs,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      followUsActions.getFollowUsSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      followUsActions.getFollowUsFailure({
        error: errorMessage || "Get follow us failed",
      }),
    );
  } finally {
  }
}

export function* getFollowUsWatcherSaga() {
  yield takeLatest(followUsActions.getFollowUs.type, getFollowUsSaga);
}
