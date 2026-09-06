import { clubMemberService } from "@lib/services/clubMember/clubMember.service";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { RemoveClubMemberAction } from "./clubMember.type";
import { clubMemberActions } from "./clubMember.slice";
import { ClubMember } from "@lib/services/clubMember/clubMember.service.type";

function* removeClubMemberSaga(action: RemoveClubMemberAction) {
  try {
    const response: Response<ClubMember> = yield call(
      clubMemberService.removeClubMember,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      clubMemberActions.removeClubMemberSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      clubMemberActions.removeClubMemberFailure({
        error: errorMessage || "Remove club member failed",
      }),
    );
  } finally {
  }
}

export function* removeClubMemberWatcherSaga() {
  yield takeLatest(
    clubMemberActions.removeClubMember.type,
    removeClubMemberSaga,
  );
}
