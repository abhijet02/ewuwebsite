import { clubMemberService } from "@lib/services/clubMember/clubMember.service";
import { ClubMember } from "@lib/services/clubMember/clubMember.service.type";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { clubMemberActions } from "./clubMember.slice";
import { CreateClubMemberAction } from "./clubMember.type";

function* createClubMemberSaga(action: CreateClubMemberAction) {
  try {
    const response: Response<ClubMember> = yield call(
      clubMemberService.createClubMember,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      clubMemberActions.createClubMemberSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      clubMemberActions.createClubMemberFailure({
        error: errorMessage || "Create club member failed",
      }),
    );
  } finally {
  }
}

export function* createClubMemberWatcherSaga() {
  yield takeLatest(
    clubMemberActions.createClubMember.type,
    createClubMemberSaga,
  );
}
