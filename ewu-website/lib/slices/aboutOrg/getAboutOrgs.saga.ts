import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { aboutOrgActions } from "./aboutOrg.slice";
import { GetAboutOrgsAction } from "./aboutOrg.type";
import { aboutOrgService } from "@lib/services/aboutOrg/aboutOrg.service";
import { GetAboutOrgsResponse } from "@lib/services/aboutOrg/aboutOrg.service.type";

function* getAboutOrgsSaga(action: GetAboutOrgsAction) {
  try {
    const response: Response<GetAboutOrgsResponse> = yield call(
      aboutOrgService.getAboutOrgs,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      aboutOrgActions.getAboutOrgsSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      aboutOrgActions.getAboutOrgsFailure({
        error: errorMessage || "Get about orgs failed",
      }),
    );
  } finally {
  }
}

export function* getAboutOrgsWatcherSaga() {
  yield takeLatest(aboutOrgActions.getAboutOrgs.type, getAboutOrgsSaga);
}
