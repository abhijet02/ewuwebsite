import { galleryService } from "@lib/services/gallery/gallery.service";
import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { CreateGalleryAction } from "./gallery.type";
import { Gallery } from "@lib/services/gallery/gallery.service.type";
import { galleryActions } from "./gallery.slice";

function* createGallerySaga(action: CreateGalleryAction) {
  try {
    const response: Response<Gallery> = yield call(
      galleryService.createGallery,
      action.payload.request,
    );
    if (response?.data == null) {
      let message = response?.errors && response?.errors[0]?.message;
      throw new Error(message);
    }
    yield put(
      galleryActions.createGallerySuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      galleryActions.createGalleryFailure({
        error: errorMessage,
      }),
    );
  } finally {
  }
}

export function* createGalleryWatcherSaga() {
  yield takeLatest(galleryActions.createGallery.type, createGallerySaga);
}
