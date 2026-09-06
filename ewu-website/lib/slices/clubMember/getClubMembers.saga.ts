import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetClubMembersAction } from "./clubMember.type";
import { clubMemberActions } from "./clubMember.slice";
import { clubMemberService } from "@lib/services/clubMember/clubMember.service";
import { GetClubMembersResponse } from "@lib/services/clubMember/clubMember.service.type";

function* getClubMembersSaga(action: GetClubMembersAction) {
  try {
    const response: Response<GetClubMembersResponse> = yield call(
      clubMemberService.getClubMembers,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      clubMemberActions.getClubMembersSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      clubMemberActions.getClubMembersFailure({
        error: errorMessage || "Get club members failed",
      }),
    );
  } finally {
  }
}

export function* getClubMembersWatcherSaga() {
  yield takeLatest(clubMemberActions.getClubMembers.type, getClubMembersSaga);
}
