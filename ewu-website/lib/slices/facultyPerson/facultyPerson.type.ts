import { BaseAction } from "@lib/action.type";
import {
  GetFacultyPersonResponse,
  GetFacultyPersonRequest,
  CreateFacultyPersonRequest,
  UpdateFacultyPersonRequest,
  RemoveFacultyPersonRequest,
  FacultyPerson,
} from "@lib/services/facultyPerson/facultyPerson.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface FacultyPersonSliceState {
  getFacultyPersonStatus: FetchStatus;
  getFacultyPersonError?: string;
  getFacultyPersonResponse?: GetFacultyPersonResponse;
  createFacultyPersonStatus: FetchStatus;
  createFacultyPersonError?: string;
  createFacultyPersonResponse?: FacultyPerson;
  updateFacultyPersonStatus: FetchStatus;
  updateFacultyPersonError?: string;
  updateFacultyPersonResponse?: FacultyPerson;
  removeFacultyPersonStatus: FetchStatus;
  removeFacultyPersonError?: string;
  removeFacultyPersonResponse?: FacultyPerson;
}

export interface GetFacultyPersonAction extends BaseAction {
  payload: {
    request: GetFacultyPersonRequest;
  };
}

export interface GetFacultyPersonSuccessAction extends BaseAction {
  payload: {
    response: GetFacultyPersonResponse;
  };
}

export interface GetFacultyPersonFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface CreateFacultyPersonAction extends BaseAction {
  payload: {
    request: CreateFacultyPersonRequest;
  };
}

export interface CreateFacultyPersonSuccessAction extends BaseAction {
  payload: {
    response: FacultyPerson;
  };
}

export interface CreateFacultyPersonFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface UpdateFacultyPersonAction extends BaseAction {
  payload: {
    request: UpdateFacultyPersonRequest;
  };
}

export interface UpdateFacultyPersonSuccessAction extends BaseAction {
  payload: {
    response: FacultyPerson;
  };
}

export interface UpdateFacultyPersonFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface RemoveFacultyPersonAction extends BaseAction {
  payload: {
    request: RemoveFacultyPersonRequest;
  };
}

export interface RemoveFacultyPersonSuccessAction extends BaseAction {
  payload: {
    response: FacultyPerson;
  };
}

export interface RemoveFacultyPersonFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}
