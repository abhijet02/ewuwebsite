import { Response } from "@/lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetQuotesAction } from "./quote.type";
import { quoteActions } from "./quote.slice";
import { quoteService } from "@/lib/services/quote/quote.service";
import { GetQuotesResponse } from "@/lib/services/quote/quote.service.type";

function* getQuotesSaga(action: GetQuotesAction) {
  try {
    const response: Response<GetQuotesResponse> = yield call(
      quoteService.getQuotes,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      quoteActions.getQuotesSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      quoteActions.getQuotesFailure({
        error: errorMessage || "Get quotes failed",
      })
    );
  } finally {
  }
}

export function* getQuotesWatcherSaga() {
  yield takeLatest(quoteActions.getQuotes.type, getQuotesSaga);
}
