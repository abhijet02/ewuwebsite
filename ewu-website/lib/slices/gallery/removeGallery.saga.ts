import { galleryService } from "@lib/services/gallery/gallery.service";
import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { RemoveGalleryAction } from "./gallery.type";
import { Gallery } from "@lib/services/gallery/gallery.service.type";
import { galleryActions } from "./gallery.slice";

function* removeGallerySaga(action: RemoveGalleryAction) {
  try {
    const response: Response<Gallery> = yield call(
      galleryService.removeGallery,
      action.payload.request,
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      galleryActions.removeGallerySuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      galleryActions.removeGalleryFailure({
        error: errorMessage,
      }),
    );
  } finally {
  }
}

export function* removeGalleryWatcherSaga() {
  yield takeLatest(galleryActions.removeGallery.type, removeGallerySaga);
}
