import { BaseAction } from "@lib/action.type";
import {
  GetJobsRequest,
  GetJobsResponse,
} from "@lib/services/job/job.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface JobSliceState {
  getJobStatus: FetchStatus;
  getJobError?: string;
  getJobResponse?: GetJobsResponse;
}

export interface GetJobsAction extends BaseAction {
  payload: {
    request: GetJobsRequest;
  };
}

export interface GetJobSuccessAction extends BaseAction {
  payload: {
    response: GetJobsResponse;
  };
}

export interface GetJobFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
