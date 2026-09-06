import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { officeMemberDocumentActions } from "./officeMemberDocument.slice";
import { GetOfficeMemberDocumentsAction } from "./officeMemberDocument.type";
import { officeMemberDocumentService } from "@lib/services/officeMemberDocument/officeMemberDocument.service";
import { GetOfficeMemberDocumentsResponse } from "@lib/services/officeMemberDocument/officeMemberDocument.service.type";

function* getOfficeMemberDocumentsSaga(action: GetOfficeMemberDocumentsAction) {
  try {
    const response: Response<GetOfficeMemberDocumentsResponse> = yield call(
      officeMemberDocumentService.getOfficeMemberDocuments,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      officeMemberDocumentActions.getOfficeMemberDocumentsSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      officeMemberDocumentActions.getOfficeMemberDocumentsFailure({
        error: errorMessage || "Get office member documents failed",
      }),
    );
  } finally {
  }
}

export function* getOfficeMemberDocumentsWatcherSaga() {
  yield takeLatest(
    officeMemberDocumentActions.getOfficeMemberDocuments.type,
    getOfficeMemberDocumentsSaga,
  );
}
