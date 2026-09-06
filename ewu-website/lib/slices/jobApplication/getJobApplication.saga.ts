import { Response } from "@services/response.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetJobApplicationsAction } from "./jobApplication.type";
import { jobApplicationActions } from "./jobApplication.slice";
import { jobApplicationService } from "@lib/services/jobApplication/jobApplication.service";
import { GetJobApplicationsResponse } from "@lib/services/jobApplication/jobApplication.service.type";

function* getJobApplicationSaga(action: GetJobApplicationsAction) {
  try {
    const response: Response<GetJobApplicationsResponse> = yield call(
      jobApplicationService.getjobAplications,
      action.payload.request
    );
    if (response?.data == null) {
      const { message } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      jobApplicationActions.getJobApplicationsSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      jobApplicationActions.getJobApplicationsFailure({
        error: errorMessage || "Get Job Applications failed",
      })
    );
  } finally {
  }
}

export function* getJobApplicationsWatcherSaga() {
  yield takeLatest(
    jobApplicationActions.getJobApplications.type,
    getJobApplicationSaga
  );
}
