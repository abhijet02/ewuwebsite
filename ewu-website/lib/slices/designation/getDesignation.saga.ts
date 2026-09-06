import { Response } from "@/lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetDesignationsAction } from "./designation.type";
import { designationActions } from "./designation.slice";
import { designationService } from "@/lib/services/designation/designation.service";
import { GetDesignationsResponse } from "@/lib/services/designation/designation.service.type";

function* getDesignationsSaga(action: GetDesignationsAction) {
  try {
    const response: Response<GetDesignationsResponse> = yield call(
      designationService.getDesignations,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      designationActions.getDesignationsSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      designationActions.getDesignationsFailure({
        error: errorMessage || "Get designations failed",
      })
    );
    // console.log(error);
  } finally {
  }
}

export function* getDesignationsWatcherSaga() {
  yield takeLatest(
    designationActions.getDesignations.type,
    getDesignationsSaga
  );
}
