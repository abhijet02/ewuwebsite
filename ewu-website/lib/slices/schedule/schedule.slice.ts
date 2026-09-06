import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  ScheduleSliceState,
  GetScheduleFailureAction,
  GetSchedulesAction,
  GetScheduleSuccessAction,
} from "./schedule.type";
//import { CreateAccordionFailureAction } from "../accordion/accordion.type";

const initState: ScheduleSliceState = {
  getScheduleStatus: FetchStatus.IDLE,
  getScheduleError: undefined,
  getScheduleResponse: undefined,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getSchedules: (state, _action: GetSchedulesAction) => {
      state.getScheduleStatus = FetchStatus.FETCHING;
      state.getScheduleError = "";
    },
    getSchedulesSuccess: (state, action: GetScheduleSuccessAction) => {
      state.getScheduleStatus = FetchStatus.SUCCESS;
      state.getScheduleResponse = action.payload.response;
    },
    getSchedulesFailure: (state, action: GetScheduleFailureAction) => {
      state.getScheduleStatus = FetchStatus.FAILURE;
      state.getScheduleError = action.payload.error;
    },

    resetSchedule: () => {
      return initState;
    },
  },
});

export const scheduleActions = scheduleSlice.actions;

export const scheduleReducer = scheduleSlice.reducer;
