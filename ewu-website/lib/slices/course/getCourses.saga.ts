import { Response } from "@lib/services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { courseActions } from "./course.slice";
import { GetCoursesAction } from "./course.type";
import { courseService } from "@lib/services/course/course.service";
import { GetCoursesResponse } from "@lib/services/course/course.service.type";

function* getCoursesSaga(action: GetCoursesAction) {
  try {
    const response: Response<GetCoursesResponse> = yield call(
      courseService.getCourses,
      action.payload.request
    );
    if (response?.data == null) {
      const message =
        response?.errors &&
        response?.errors[0]?.extensions?.originalError?.message;
      throw new Error(message);
    }
    yield put(
      courseActions.getCoursesSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      courseActions.getCoursesFailure({
        error: errorMessage || "Get courses failed",
      })
    );
  } finally {
  }
}

export function* getCoursesWatcherSaga() {
  yield takeLatest(courseActions.getCourses.type, getCoursesSaga);
}
