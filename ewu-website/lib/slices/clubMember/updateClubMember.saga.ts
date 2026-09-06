import { clubMemberService } from "@lib/services/clubMember/clubMember.service";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { UpdateClubMemberAction } from "./clubMember.type";
import { clubMemberActions } from "./clubMember.slice";
import { ClubMember } from "@lib/services/clubMember/clubMember.service.type";

function* updateClubMemberSaga(action: UpdateClubMemberAction) {
  try {
    const response: Response<ClubMember> = yield call(
      clubMemberService.updateClubMember,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      clubMemberActions.updateClubMemberSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      clubMemberActions.updateClubMemberFailure({
        error: errorMessage || "Update club member failed",
      }),
    );
  } finally {
  }
}

export function* updateClubMemberWatcherSaga() {
  yield takeLatest(
    clubMemberActions.updateClubMember.type,
    updateClubMemberSaga,
  );
}
