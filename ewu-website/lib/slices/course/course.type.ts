import { BaseAction } from "@lib/action.type";
import {
  GetCoursesResponse,
  GetCoursesRequest,
} from "@lib/services/course/course.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface CourseSliceState {
  getCoursesStatus: FetchStatus;
  getCoursesError?: string;
  getCoursesResponse?: GetCoursesResponse;
}

export interface GetCoursesAction extends BaseAction {
  payload: {
    request: GetCoursesRequest;
  };
}

export interface GetCoursesSuccessAction extends BaseAction {
  payload: {
    response: GetCoursesResponse;
  };
}

export interface GetCoursesFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
