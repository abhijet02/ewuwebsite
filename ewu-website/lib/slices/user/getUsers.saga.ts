import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { userActions } from "./user.slice";
import { GetUsersAction } from "./user.type";
import { userService } from "@lib/services/user/user.service";
import { GetUsersResponse } from "@lib/services/user/user.service.type";

function* getUsersSaga(action: GetUsersAction) {
  try {
    const response: Response<GetUsersResponse> = yield call(
      userService.getUsers,
      action.payload.request
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      userActions.getUsersSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error?.message;
    yield put(
      userActions.getUsersFailure({
        error: errorMessage,
      })
    );
  } finally {
  }
}

export function* getUsersWatcherSaga() {
  yield takeLatest(userActions.getUsers.type, getUsersSaga);
}
