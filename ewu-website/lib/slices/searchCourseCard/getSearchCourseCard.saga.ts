import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { searchCourseCardActions } from "./searchCourseCard.slice";
import { GetSearchCourseCardAction } from "./searchCourseCard.type";
import { searchCourseCardService } from "@lib/services/searchCourseCard/searchCourseCard.service";
import { GetSearchCourseCardResponse } from "@lib/services/searchCourseCard/searchCourseCard.service.type";

function* getSearchCourseCardSaga(action: GetSearchCourseCardAction) {
  try {
    const response: Response<GetSearchCourseCardResponse> = yield call(
      searchCourseCardService.getSearchCourseCard,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      searchCourseCardActions.getSearchCourseCardSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      searchCourseCardActions.getSearchCourseCardFailure({
        error: errorMessage || "Get SearchCourseCard failed",
      })
    );
  } finally {
  }
}

export function* getSearchCourseCardWatcherSaga() {
  yield takeLatest(
    searchCourseCardActions.getSearchCourseCard.type,
    getSearchCourseCardSaga
  );
}
