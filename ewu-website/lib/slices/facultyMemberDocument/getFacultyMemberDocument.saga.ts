import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { facultyMemberDocumentActions } from "./facultyMemberDocument.slice";
import { GetFacultyMemberDocumentsAction } from "./facultyMemberDocument.type";
import { facultyMemberDocumentService } from "@lib/services/facultyMemberDocument/facultyMemberDocument.service";
import { GetFacultyMemberDocumentsResponse } from "@lib/services/facultyMemberDocument/facultyMemberDocument.service.type";

function* getFacultyMemberDocumentsSaga(
  action: GetFacultyMemberDocumentsAction,
) {
  try {
    const response: Response<GetFacultyMemberDocumentsResponse> = yield call(
      facultyMemberDocumentService.getFacultyMemberDocuments,
      action.payload.request,
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      facultyMemberDocumentActions.getFacultyMemberDocumentsSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      facultyMemberDocumentActions.getFacultyMemberDocumentsFailure({
        error: errorMessage || "Get faculty member documents failed",
      }),
    );
  } finally {
  }
}

export function* getFacultyMemberDocumentsWatcherSaga() {
  yield takeLatest(
    facultyMemberDocumentActions.getFacultyMemberDocuments.type,
    getFacultyMemberDocumentsSaga,
  );
}
