import { Response } from "@/lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { departmentActions } from "./department.slice";
import { GetDepartmentsAction } from "./department.type";
import { departmentService } from "@/lib/services/department/department.service";
import { GetDepartmentsResponse } from "@/lib/services/department/department.service.type";

function* getdepartmentsSaga(action: GetDepartmentsAction) {
  try {
    const response: Response<GetDepartmentsResponse> = yield call(
      departmentService.getDepartments,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      departmentActions.getDepartmentsSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      departmentActions.getDepartmentsFailure({
        error: errorMessage || "Get departments failed",
      })
    );
  } finally {
  }
}

export function* getDepartmentsWatcherSaga() {
  yield takeLatest(departmentActions.getDepartments.type, getdepartmentsSaga);
}
