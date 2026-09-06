import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetCategoriesAction } from "./category.type";
import { categoryActions } from "./category.slice";
import { categoryService } from "@lib/services/category/category.service";
import { GetCategoriesResponse } from "@lib/services/category/category.service.type";

function* getCategoriesSaga(action: GetCategoriesAction) {
  try {
    const response: Response<GetCategoriesResponse> = yield call(
      categoryService.getCategories,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      categoryActions.getCategoriesSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      categoryActions.getCategoriesFailure({
        error: errorMessage || "Get categories failed",
      })
    );
    // console.log(error);
  } finally {
  }
}

export function* getCategoriesWatcherSaga() {
  yield takeLatest(categoryActions.getCategories.type, getCategoriesSaga);
}
