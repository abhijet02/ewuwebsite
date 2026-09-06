import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { UpdateJobApplicationAction } from "./jobApplication.type";
import { jobApplicationActions } from "./jobApplication.slice";
import { JobApplication } from "@lib/services/jobApplication/jobApplication.service.type";
import { jobApplicationService } from "@lib/services/jobApplication/jobApplication.service";
function* updateJobApplicationSaga(action: UpdateJobApplicationAction) {
  try {
    const response: Response<JobApplication> = yield call(
      jobApplicationService.createJobApplication,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      jobApplicationActions.updateJobApplicationSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      jobApplicationActions.updateJobApplicationFailure({
        error: errorMessage || "Update Job Application failed",
      })
    );
  } finally {
  }
}

export function* updateJobApplicationWatcherSaga() {
  yield takeLatest(
    jobApplicationActions.updateJobApplication.type,
    updateJobApplicationSaga
  );
}
