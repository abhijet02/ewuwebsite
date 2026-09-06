import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { officeMemberActions } from "./officeMember.slice";
import { GetOfficeMembersAction } from "./officeMember.type";
import { officeMemberService } from "@lib/services/officeMember/officeMember.service";
import { GetOfficeMembersResponse } from "@lib/services/officeMember/officeMember.service.type";

function* getOfficeMembersSaga(action: GetOfficeMembersAction) {
  try {
    const response: Response<GetOfficeMembersResponse> = yield call(
      officeMemberService.getOfficeMembers,
      action.payload.request
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      officeMemberActions.getOfficeMembersSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      officeMemberActions.getOfficeMembersFailure({
        error: errorMessage,
      })
    );
  } finally {
  }
}

export function* getOfficeMembersWatcherSaga() {
  yield takeLatest(
    officeMemberActions.getOfficeMembers.type,
    getOfficeMembersSaga
  );
}
