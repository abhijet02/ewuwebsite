import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { faqActions } from "./faq.slice";
import { GetFaqAction } from "./faq.type";
import { faqService } from "@lib/services/faq/faq.service";
import { GetFaqResponse } from "@lib/services/faq/faq.service.type";

function* getFaqKewordSaga(action: GetFaqAction) {
  try {
    const response: Response<GetFaqResponse> = yield call(
      faqService.getFaqs,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      faqActions.getFaqSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      faqActions.getFaqFailure({
        error: errorMessage || "Get faq failed",
      }),
    );
  } finally {
  }
}

export function* getFaqWatcherSaga() {
  yield takeLatest(faqActions.getFaq.type, getFaqKewordSaga);
}
