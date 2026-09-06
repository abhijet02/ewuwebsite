import { officeMemberService } from "@lib/services/officeMember/officeMember.service";
import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { UpdateOfficeMemberAction } from "./officeMember.type";
import { OfficeMember } from "@lib/services/officeMember/officeMember.service.type";
import { officeMemberActions } from "./officeMember.slice";

function* updateOfficeMemberSaga(action: UpdateOfficeMemberAction) {
  try {
    const response: Response<OfficeMember> = yield call(
      officeMemberService.updateOfficeMember,
      action.payload.request
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      officeMemberActions.updateOfficeMemberSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      officeMemberActions.updateOfficeMemberFailure({
        error: errorMessage,
      })
    );
  } finally {
  }
}

export function* updateOfficeMemberWatcherSaga() {
  yield takeLatest(
    officeMemberActions.updateOfficeMember.type,
    updateOfficeMemberSaga
  );
}
