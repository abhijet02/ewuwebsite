import { userService } from "@lib/services/user/user.service";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { CreateUserAction } from "./user.type";
import { User } from "@lib/services/user/user.service.type";
import { userActions } from "./user.slice";

function* createUserSaga(action: CreateUserAction) {
  try {
    const response: Response<User> = yield call(
      userService.createUser,
      action.payload.request
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      userActions.createUserSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error?.message;
    yield put(
      userActions.createUserFailure({
        error: errorMessage,
      })
    );
  } finally {
  }
}

export function* createUserWatcherSaga() {
  yield takeLatest(userActions.createUser.type, createUserSaga);
}
