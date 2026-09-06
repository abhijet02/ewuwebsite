import { jobApplicationService } from "@lib/services/jobApplication/jobApplication.service";
import { JobApplication } from "@lib/services/jobApplication/jobApplication.service.type";
import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { jobApplicationActions } from "./jobApplication.slice";
import { CreateJobApplicationAction } from "./jobApplication.type";

function* createJobApplicationSaga(action: CreateJobApplicationAction) {
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
      jobApplicationActions.createJobApplicationSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      jobApplicationActions.createJobApplicationFailure({
        error: errorMessage || "Create Job Application failed",
      })
    );
  } finally {
  }
}

export function* createJobApplicationWatcherSaga() {
  yield takeLatest(
    jobApplicationActions.createJobApplication.type,
    createJobApplicationSaga
  );
}
