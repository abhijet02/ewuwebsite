import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetSkillsAction } from "./skill.type";
import { skillActions } from "./skill.slice";
import { skillService } from "@lib/services/skill/skill.service";
import { GetSkillsResponse } from "@lib/services/skill/skill.service.type";

function* getSkillsSaga(action: GetSkillsAction) {
  try {
    const response: Response<GetSkillsResponse> = yield call(
      skillService.getSkills,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      skillActions.getSkillsSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      skillActions.getSkillsFailure({
        error: errorMessage || "Get skills failed",
      }),
    );
  } finally {
  }
}

export function* getSkillsWatcherSaga() {
  yield takeLatest(skillActions.getSkills.type, getSkillsSaga);
}
