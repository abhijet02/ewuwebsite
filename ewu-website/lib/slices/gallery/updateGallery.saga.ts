import { galleryService } from "@lib/services/gallery/gallery.service";
import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { UpdateGalleryAction } from "./gallery.type";
import { Gallery } from "@lib/services/gallery/gallery.service.type";
import { galleryActions } from "./gallery.slice";

function* updateGallerySaga(action: UpdateGalleryAction) {
  try {
    const response: Response<Gallery> = yield call(
      galleryService.updateGallery,
      action.payload.request,
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      galleryActions.updateGallerySuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      galleryActions.updateGalleryFailure({
        error: errorMessage,
      }),
    );
  } finally {
  }
}

export function* updateGalleryWatcherSaga() {
  yield takeLatest(galleryActions.updateGallery.type, updateGallerySaga);
}
