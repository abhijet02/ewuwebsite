import { officeMemberService } from "@lib/services/officeMember/officeMember.service";
import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { CreateOfficeMemberAction } from "./officeMember.type";
import { OfficeMember } from "@lib/services/officeMember/officeMember.service.type";
import { officeMemberActions } from "./officeMember.slice";

function* createOfficeMemberSaga(action: CreateOfficeMemberAction) {
  try {
    const response: Response<OfficeMember> = yield call(
      officeMemberService.createOfficeMember,
      action.payload.request
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      officeMemberActions.createOfficeMemberSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      officeMemberActions.createOfficeMemberFailure({
        error: errorMessage,
      })
    );
  } finally {
  }
}

export function* createOfficeMemberWatcherSaga() {
  yield takeLatest(
    officeMemberActions.createOfficeMember.type,
    createOfficeMemberSaga
  );
}
