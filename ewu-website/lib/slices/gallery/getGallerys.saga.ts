import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { galleryActions } from "./gallery.slice";
import { GetGallerysAction } from "./gallery.type";
import { galleryService } from "@lib/services/gallery/gallery.service";
import { GetGallerysResponse } from "@lib/services/gallery/gallery.service.type";

function* getGallerysSaga(action: GetGallerysAction) {
  try {
    const response: Response<GetGallerysResponse> = yield call(
      galleryService.getGallerys,
      action.payload.request,
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      galleryActions.getGallerysSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      galleryActions.getGallerysFailure({
        error: errorMessage,
      }),
    );
  } finally {
  }
}

export function* getGallerysWatcherSaga() {
  yield takeLatest(galleryActions.getGallerys.type, getGallerysSaga);
}
