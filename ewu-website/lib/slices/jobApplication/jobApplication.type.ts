import { BaseAction } from "@lib/action.type";
import {
  JobApplication,
  GetJobApplicationsRequest,
  GetJobApplicationsResponse,
  CreateJobApplicationRequest,
  UpdateJobApplicationRequest,
  RemoveJobApplicationRequest,
} from "@lib/services/jobApplication/jobApplication.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface JobApplicationSliceState {
  getJobApplicationsStatus: FetchStatus;
  getJobApplicationsError?: string;
  getJobApplicationsResponse?: GetJobApplicationsResponse;
  createJobApplicationStatus: FetchStatus;
  createJobApplicationError?: string;
  createJobApplicationResponse?: JobApplication;
  updateJobApplicationStatus: FetchStatus;
  updateJobApplicationError?: string;
  updateJobApplicationResponse?: JobApplication;
  removeJobApplicationStatus: FetchStatus;
  removeJobApplicationError?: string;
  removeJobApplicationResponse?: JobApplication;
}

export interface GetJobApplicationsAction extends BaseAction {
  payload: {
    request: GetJobApplicationsRequest;
  };
}

export interface GetJobApplicationsSuccessAction extends BaseAction {
  payload: {
    response: GetJobApplicationsResponse;
  };
}

export interface GetJobApplicationsFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface CreateJobApplicationAction extends BaseAction {
  payload: {
    request: CreateJobApplicationRequest;
  };
}

export interface CreateJobApplicationSuccessAction extends BaseAction {
  payload: {
    response: JobApplication;
  };
}

export interface CreateJobApplicationFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface UpdateJobApplicationAction extends BaseAction {
  payload: {
    request: UpdateJobApplicationRequest;
  };
}

export interface UpdateJobApplicationSuccessAction extends BaseAction {
  payload: {
    response: JobApplication;
  };
}

export interface UpdateJobApplicationFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface RemoveJobApplicationAction extends BaseAction {
  payload: {
    request: RemoveJobApplicationRequest;
  };
}

export interface RemoveJobApplicationSuccessAction extends BaseAction {
  payload: {
    response: JobApplication;
  };
}

export interface RemoveJobApplicationFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
