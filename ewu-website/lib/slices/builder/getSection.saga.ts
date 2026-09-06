import { sectionService } from "@lib/services/builder/section.service";
import { GetSectionsResponse } from "@lib/services/builder/section.service.type";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { sectionActions } from "./section.slice";
import { GetSectionsAction } from "./section.type";

function* getSectionsSaga(action: GetSectionsAction) {
  try {
    const response: Response<GetSectionsResponse> = yield call(
      sectionService.getSections,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      sectionActions.getSectionsSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      sectionActions.getSectionsFailure({
        error: errorMessage || "Get sections failed",
      })
    );
    // console.log(error);
  } finally {
  }
}

export function* getSectionsWatcherSaga() {
  yield takeLatest(sectionActions.getSections.type, getSectionsSaga);
}
