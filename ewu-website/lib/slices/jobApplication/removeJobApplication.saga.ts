import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { RemoveJobApplicationAction } from "./jobApplication.type";
import { JobApplication } from "@lib/services/jobApplication/jobApplication.service.type";
import { jobApplicationService } from "@lib/services/jobApplication/jobApplication.service";
import { jobApplicationActions } from "./jobApplication.slice";

function* removeJobApplicationSaga(action: RemoveJobApplicationAction) {
  try {
    const response: Response<JobApplication> = yield call(
      jobApplicationService.removeJobApplication,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      jobApplicationActions.removeJobApplicationSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      jobApplicationActions.removeJobApplicationFailure({
        error: errorMessage || "Delete Job Application failed",
      }),
    );
  } finally {
  }
}

export function* removeJobApplicationWatcherSaga() {
  yield takeLatest(
    jobApplicationActions.removeJobApplication.type,
    removeJobApplicationSaga,
  );
}
