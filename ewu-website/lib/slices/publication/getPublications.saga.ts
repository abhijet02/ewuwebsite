import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { publicationActions } from "./publication.slice";
import { GetPublicationsAction } from "./publication.type";
import { publicationService } from "@lib/services/publication/publication.service";
import { GetPublicationsResponse } from "@lib/services/publication/publication.service.type";

function* getPublicationsSaga(action: GetPublicationsAction) {
  try {
    const response: Response<GetPublicationsResponse> = yield call(
      publicationService.getPublications,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      publicationActions.getPublicationsSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      publicationActions.getPublicationsFailure({
        error: errorMessage || "Get publications failed",
      }),
    );
  } finally {
  }
}

export function* getPublicationsWatcherSaga() {
  yield takeLatest(
    publicationActions.getPublications.type,
    getPublicationsSaga,
  );
}
