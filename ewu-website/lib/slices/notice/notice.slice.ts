import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@/lib/services/fetch.type";
import {
  NoticeSliceState,
  GetNoticesAction,
  GetNoticesSuccessAction,
  GetNoticesFailureAction,
} from "./notice.type";

const initState: NoticeSliceState = {
  getNoticeStatus: FetchStatus.IDLE,
  getNoticeError: undefined,
  getNoticeResponse: undefined,
};

const noticeSlice = createSlice({
  name: "notice",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getNotices: (state, _action: GetNoticesAction) => {
      state.getNoticeStatus = FetchStatus.FETCHING;
      state.getNoticeError = "";
    },
    getNoticesSuccess: (state, action: GetNoticesSuccessAction) => {
      state.getNoticeStatus = FetchStatus.SUCCESS;
      state.getNoticeResponse = action.payload.response;
    },
    getNoticesFailure: (state, action: GetNoticesFailureAction) => {
      state.getNoticeStatus = FetchStatus.FAILURE;
      state.getNoticeError = action.payload.error;
    },

    resetNotice: () => {
      return initState;
    },
  },
});

export const noticeActions = noticeSlice.actions;

export const noticeReducer = noticeSlice.reducer;
