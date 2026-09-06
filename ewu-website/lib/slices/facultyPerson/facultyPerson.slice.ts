import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  FacultyPersonSliceState,
  GetFacultyPersonAction,
  GetFacultyPersonSuccessAction,
  GetFacultyPersonFailureAction,
  CreateFacultyPersonAction,
  CreateFacultyPersonFailureAction,
  CreateFacultyPersonSuccessAction,
  RemoveFacultyPersonAction,
  RemoveFacultyPersonFailureAction,
  RemoveFacultyPersonSuccessAction,
  UpdateFacultyPersonAction,
  UpdateFacultyPersonFailureAction,
  UpdateFacultyPersonSuccessAction,
} from "./facultyPerson.type";

const initState: FacultyPersonSliceState = {
  getFacultyPersonStatus: FetchStatus.IDLE,
  getFacultyPersonError: undefined,
  getFacultyPersonResponse: undefined,
  createFacultyPersonStatus: FetchStatus.IDLE,
  createFacultyPersonError: undefined,
  createFacultyPersonResponse: undefined,
  updateFacultyPersonStatus: FetchStatus.IDLE,
  updateFacultyPersonError: undefined,
  updateFacultyPersonResponse: undefined,
  removeFacultyPersonStatus: FetchStatus.IDLE,
  removeFacultyPersonError: undefined,
  removeFacultyPersonResponse: undefined,
};

const facultyPersonSlice = createSlice({
  name: "facultyPerson",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getFacultyPersons: (state, _action: GetFacultyPersonAction) => {
      state.getFacultyPersonStatus = FetchStatus.FETCHING;
      state.getFacultyPersonError = "";
    },
    getfacultyPersonSuccess: (state, action: GetFacultyPersonSuccessAction) => {
      state.getFacultyPersonStatus = FetchStatus.SUCCESS;
      state.getFacultyPersonResponse = action.payload.response;
    },
    getfacultyPersonFailure: (state, action: GetFacultyPersonFailureAction) => {
      state.getFacultyPersonStatus = FetchStatus.FAILURE;
      state.getFacultyPersonError = action.payload.error;
    },

    createfacultyPerson: (state, _action: CreateFacultyPersonAction) => {
      state.createFacultyPersonStatus = FetchStatus.FETCHING;
      state.createFacultyPersonError = "";
    },
    createfacultyPersonSuccess: (
      state,
      action: CreateFacultyPersonSuccessAction,
    ) => {
      state.createFacultyPersonStatus = FetchStatus.SUCCESS;
      state.createFacultyPersonResponse = action.payload.response;
    },
    createfacultyPersonFailure: (
      state,
      action: CreateFacultyPersonFailureAction,
    ) => {
      state.createFacultyPersonStatus = FetchStatus.FAILURE;
      state.createFacultyPersonError = action.payload.error;
    },

    updatefacultyPerson: (state, _action: UpdateFacultyPersonAction) => {
      state.updateFacultyPersonStatus = FetchStatus.FETCHING;
      state.updateFacultyPersonError = "";
    },
    updatefacultyPersonSuccess: (
      state,
      action: UpdateFacultyPersonSuccessAction,
    ) => {
      state.updateFacultyPersonStatus = FetchStatus.SUCCESS;
      state.updateFacultyPersonResponse = action.payload.response;
    },
    updatefacultyPersonFailure: (
      state,
      action: UpdateFacultyPersonFailureAction,
    ) => {
      state.updateFacultyPersonStatus = FetchStatus.FAILURE;
      state.updateFacultyPersonError = action.payload.error;
    },

    removefacultyPerson: (state, _action: RemoveFacultyPersonAction) => {
      state.removeFacultyPersonStatus = FetchStatus.FETCHING;
      state.removeFacultyPersonError = "";
    },
    removefacultyPersonSuccess: (
      state,
      action: RemoveFacultyPersonSuccessAction,
    ) => {
      state.removeFacultyPersonStatus = FetchStatus.SUCCESS;
      state.removeFacultyPersonResponse = action.payload.response;
    },
    removefacultyPersonFailure: (
      state,
      action: RemoveFacultyPersonFailureAction,
    ) => {
      state.removeFacultyPersonStatus = FetchStatus.FAILURE;
      state.removeFacultyPersonError = action.payload.error;
    },

    resetfacultyPerson: () => {
      return initState;
    },
  },
});

export const facultyPersonActions = facultyPersonSlice.actions;
export const facultyPersonReducer = facultyPersonSlice.reducer;
