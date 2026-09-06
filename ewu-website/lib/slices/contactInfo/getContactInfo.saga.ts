import { Response } from "@/lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetContactInfoAction } from "./contactInfo.type";
import { contactInfoActions } from "./contactInfo.slice";
import { contactInfoService } from "@/lib/services/contactInfo/contactInfo.service";
import { GetContactInfoResponse } from "@/lib/services/contactInfo/contactInfo.service.type";

function* getContactInfoSaga(action: GetContactInfoAction) {
  try {
    const response: Response<GetContactInfoResponse> = yield call(
      contactInfoService.getContactInfo,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      contactInfoActions.getContactInfoSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      contactInfoActions.getContactInfoFailure({
        error: errorMessage || "Get contact info failed",
      })
    );
    // console.log(error);
  } finally {
  }
}

export function* getContactInfoWatcherSaga() {
  yield takeLatest(contactInfoActions.getContactInfo.type, getContactInfoSaga);
}
