import { userService } from "@lib/services/user/user.service";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { UpdateUserAction } from "./user.type";
import { User } from "@lib/services/user/user.service.type";
import { userActions } from "./user.slice";

function* updateUserSaga(action: UpdateUserAction) {
  try {
    const response: Response<User> = yield call(
      userService.updateUser,
      action.payload.request
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      userActions.updateUserSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error?.message;
    yield put(
      userActions.updateUserFailure({
        error: errorMessage,
      })
    );
  } finally {
  }
}

export function* updateUserWatcherSaga() {
  yield takeLatest(userActions.updateUser.type, updateUserSaga);
}
