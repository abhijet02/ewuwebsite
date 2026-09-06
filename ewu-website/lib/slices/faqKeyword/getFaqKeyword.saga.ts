import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { faqKeywordActions } from "./faqKeyword.slice";
import { GetFaqKeywordAction } from "./faqKeyword.type";
import { faqKeywordService } from "@lib/services/faqKeyword/faqKeyword.service";
import { GetFaqKeywordResponse } from "@lib/services/faqKeyword/faqKeyword.service.type";

function* getFaqKeywordSaga(action: GetFaqKeywordAction) {
  try {
    const response: Response<GetFaqKeywordResponse> = yield call(
      faqKeywordService.getFaqKeyword,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      faqKeywordActions.getFaqKeywordSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      faqKeywordActions.getFaqKeywordFailure({
        error: errorMessage || "Get faq keyword failed",
      }),
    );
  } finally {
  }
}

export function* getFaqKeywordWatcherSaga() {
  yield takeLatest(faqKeywordActions.getFaqKeyword.type, getFaqKeywordSaga);
}
