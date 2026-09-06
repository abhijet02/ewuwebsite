import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { jobActions } from "./job.slice";
import { GetJobsAction } from "./job.type";
import { GetJobsResponse } from "@lib/services/job/job.service.type";
import { jobService } from "@lib/services/job/job.service";

function* getJobSaga(action: GetJobsAction) {
  try {
    const response: Response<GetJobsResponse> = yield call(
      jobService.getJobs,
      action.payload.request,
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      jobActions.getJobsSuccess({
        response: response?.data,
      }),
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      jobActions.getJobsFailure({
        error: errorMessage || "Get jobs failed",
      }),
    );
  } finally {
  }
}

export function* getJobsWatcherSaga() {
  yield takeLatest(jobActions.getJobs.type, getJobSaga);
}
