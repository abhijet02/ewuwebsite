import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetSlidersAction } from "./slider.type";
import { sliderActions } from "./slider.slice";
import { sliderService } from "@lib/services/slider/slider.service";
import { GetSlidersResponse } from "@lib/services/slider/slider.service.type";

function* getSlidersSaga(action: GetSlidersAction) {
  try {
    const response: Response<GetSlidersResponse> = yield call(
      sliderService.getSliders,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      sliderActions.getSlidersSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      sliderActions.getSlidersFailure({
        error: errorMessage || "Get sliders failed",
      }),
    );
  } finally {
  }
}

export function* getSlidersWatcherSaga() {
  yield takeLatest(sliderActions.getSliders.type, getSlidersSaga);
}
