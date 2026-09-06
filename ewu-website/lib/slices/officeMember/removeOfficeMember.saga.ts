import { officeMemberService } from "@lib/services/officeMember/officeMember.service";
import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { RemoveOfficeMemberAction } from "./officeMember.type";
import { OfficeMember } from "@lib/services/officeMember/officeMember.service.type";
import { officeMemberActions } from "./officeMember.slice";

function* removeOfficeMemberSaga(action: RemoveOfficeMemberAction) {
  try {
    const response: Response<OfficeMember> = yield call(
      officeMemberService.removeOfficeMember,
      action.payload.request
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      officeMemberActions.removeOfficeMemberSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      officeMemberActions.removeOfficeMemberFailure({
        error: errorMessage,
      })
    );
  } finally {
  }
}

export function* removeOfficeMemberWatcherSaga() {
  yield takeLatest(
    officeMemberActions.removeOfficeMember.type,
    removeOfficeMemberSaga
  );
}
