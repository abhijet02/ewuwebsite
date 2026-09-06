import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { officeDocumentActions } from "./officeDocument.slice";
import { GetOfficeDocumentsAction } from "./officeDocument.type";
import { officeDocumentService } from "@lib/services/officeDocument/officeDocument.service";
import { GetOfficeDocumentsResponse } from "@lib/services/officeDocument/officeDocument.service.type";

function* getOfficeDocumentsSaga(action: GetOfficeDocumentsAction) {
  try {
    const response: Response<GetOfficeDocumentsResponse> = yield call(
      officeDocumentService.getOfficeDocuments,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      officeDocumentActions.getOfficeDocumentsSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      officeDocumentActions.getOfficeDocumentsFailure({
        error: errorMessage || "Get office  documents failed",
      }),
    );
  } finally {
  }
}

export function* getOfficeDocumentsWatcherSaga() {
  yield takeLatest(
    officeDocumentActions.getOfficeDocuments.type,
    getOfficeDocumentsSaga,
  );
}
