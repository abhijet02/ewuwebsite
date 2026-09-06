import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetNewsMediaOrgAction } from "./newsMediaOrg.type";
import { newsMediaOrgActions } from "./newsMediaOrg.slice";
import { newsMediaOrgService } from "@lib/services/newsMediaOrg/newsMediaOrg.service";
import { GetNewsMediaOrgResponse } from "@lib/services/newsMediaOrg/newsMediaOrg.service.type";

function* getNewsMediaOrgSaga(action: GetNewsMediaOrgAction) {
  try {
    const response: Response<GetNewsMediaOrgResponse> = yield call(
      newsMediaOrgService.getNewsMediaOrg,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      newsMediaOrgActions.getNewsMediaOrgSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      newsMediaOrgActions.getNewsMediaOrgFailure({
        error: errorMessage || "Get news media org failed",
      }),
    );
  } finally {
  }
}

export function* getNewsMediaOrgWatcherSaga() {
  yield takeLatest(
    newsMediaOrgActions.getNewsMediaOrg.type,
    getNewsMediaOrgSaga,
  );
}
