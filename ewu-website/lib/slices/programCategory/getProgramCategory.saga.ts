import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetProgramCategoriesAction } from "./programCategory.type";
import { programCategoryActions } from "./programCategory.slice";
import { programCategoryService } from "@lib/services/programCategory/programCategory.service";
import { GetProgramCategoriesResponse } from "@lib/services/programCategory/programCategory.service.type";

function* getProgramCategoriesSaga(action: GetProgramCategoriesAction) {
  try {
    const response: Response<GetProgramCategoriesResponse> = yield call(
      programCategoryService.getProgramCategories,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      programCategoryActions.getProgramCategoriesSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      programCategoryActions.getProgramCategoriesFailure({
        error: errorMessage || "Get program categories failed",
      })
    );
    // console.log(error);
  } finally {
  }
}

export function* getProgramCategoriesWatcherSaga() {
  yield takeLatest(
    programCategoryActions.getProgramCategories.type,
    getProgramCategoriesSaga
  );
}
