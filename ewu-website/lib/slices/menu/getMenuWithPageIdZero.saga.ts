import { Response } from "@/lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { menuActions } from "./menu.slice";
import { GetMenusAction } from "./menu.type";
import { menuService } from "@/lib/services/menu/menu.service";
import { GetMenusWithPageIdZeroResponse } from "@/lib/services/menu/menu.service.type";

function* getMenusWithPageIdZeroSaga(action: GetMenusAction) {
  try {
    const response: Response<GetMenusWithPageIdZeroResponse> = yield call(
      menuService.getMenusWithPageIdZero,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      menuActions.getMenusWithPageIdZeroSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      menuActions.getMenusWithPageIdZeroFailure({
        error: errorMessage || "Get menus failed",
      })
    );
  } finally {
  }
}

export function* getMenusWithPageIdZeroWatcherSaga() {
  yield takeLatest(menuActions.getMenusWithPageIdZero.type, getMenusWithPageIdZeroSaga);
}
