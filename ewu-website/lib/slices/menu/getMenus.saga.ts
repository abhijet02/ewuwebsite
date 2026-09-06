import { Response } from "@/lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { menuActions } from "./menu.slice";
import { GetMenusAction } from "./menu.type";
import { menuService } from "@/lib/services/menu/menu.service";
import { GetMenusResponse } from "@/lib/services/menu/menu.service.type";

function* getMenusSaga(action: GetMenusAction) {
  try {
    const response: Response<GetMenusResponse> = yield call(
      menuService.getMenus,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      menuActions.getMenusSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      menuActions.getMenusFailure({
        error: errorMessage || "Get menus failed",
      })
    );
  } finally {
  }
}

export function* getMenusWatcherSaga() {
  yield takeLatest(menuActions.getMenus.type, getMenusSaga);
}
