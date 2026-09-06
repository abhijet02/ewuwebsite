import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetPartnershipsAction } from "./partnership.type";
import { partnershipActions } from "./partnership.slice";
import { partnershipService } from "@lib/services/partnership/partnership.service";
import { GetPartnershipsResponse } from "@lib/services/partnership/partnership.service.type";

function* getPartnershipsSaga(action: GetPartnershipsAction) {
  try {
    const response: Response<GetPartnershipsResponse> = yield call(
      partnershipService.getPartnerships,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      partnershipActions.getPartnershipsSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      partnershipActions.getPartnershipsFailure({
        error: errorMessage || "Get partnership failed",
      })
    );
  } finally {
  }
}

export function* getPartnershipsWatcherSaga() {
  yield takeLatest(
    partnershipActions.getPartnerships.type,
    getPartnershipsSaga
  );
}
