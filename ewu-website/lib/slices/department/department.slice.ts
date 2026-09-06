import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@/lib/services/fetch.type";
import {
  DepartmentSliceState,
  GetDepartmentsAction,
  GetDepartmentsFailureAction,
  GetDepartmentsSuccessAction,
} from "./department.type";

const initState: DepartmentSliceState = {
  getDepartmentsStatus: FetchStatus.IDLE,
  getDepartmentsError: undefined,
  getDepartmentsResponse: undefined,
};

const departmentSlice = createSlice({
  name: "department",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getDepartments: (state, _action: GetDepartmentsAction) => {
      state.getDepartmentsStatus = FetchStatus.FETCHING;
      state.getDepartmentsError = "";
    },
    getDepartmentsSuccess: (state, action: GetDepartmentsSuccessAction) => {
      state.getDepartmentsStatus = FetchStatus.SUCCESS;
      state.getDepartmentsResponse = action.payload.response;
    },
    getDepartmentsFailure: (state, action: GetDepartmentsFailureAction) => {
      state.getDepartmentsStatus = FetchStatus.FAILURE;
      state.getDepartmentsError = action.payload.error;
    },

    resetDepartment: () => {
      return initState;
    },
  },
});

export const departmentActions = departmentSlice.actions;

export const departmentReducer = departmentSlice.reducer;
