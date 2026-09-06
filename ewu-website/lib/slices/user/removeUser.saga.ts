import { userService } from "@lib/services/user/user.service";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { RemoveUserAction } from "./user.type";
import { userActions } from "./user.slice";
import { User } from "@lib/services/user/user.service.type";

function* removeUserSaga(action: RemoveUserAction) {
  try {
    const response: Response<User> = yield call(
      userService.removeUser,
      action.payload.request
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      userActions.removeUserSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error?.message;
    yield put(
      userActions.removeUserFailure({
        error: errorMessage,
      })
    );
  } finally {
  }
}

export function* removeUserWatcherSaga() {
  yield takeLatest(userActions.removeUser.type, removeUserSaga);
}
