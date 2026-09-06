import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  CourseSliceState,
  GetCoursesAction,
  GetCoursesFailureAction,
  GetCoursesSuccessAction,
} from "./course.type";

const initState: CourseSliceState = {
  getCoursesStatus: FetchStatus.IDLE,
  getCoursesError: undefined,
  getCoursesResponse: undefined,
};

const courseSlice = createSlice({
  name: "course",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getCourses: (state, _action: GetCoursesAction) => {
      state.getCoursesStatus = FetchStatus.FETCHING;
      state.getCoursesError = "";
    },
    getCoursesSuccess: (state, action: GetCoursesSuccessAction) => {
      state.getCoursesStatus = FetchStatus.SUCCESS;
      state.getCoursesResponse = action.payload.response;
    },
    getCoursesFailure: (state, action: GetCoursesFailureAction) => {
      state.getCoursesStatus = FetchStatus.FAILURE;
      state.getCoursesError = action.payload.error;
    },

    resetCourse: () => {
      return initState;
    },
  },
});

export const courseActions = courseSlice.actions;
export const courseReducer = courseSlice.reducer;
