import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  EventsSliceState,
  GetEventsAction,
  GetEventsSuccessAction,
  GetEventsFailureAction,
} from "./event.type";

const initState: EventsSliceState = {
  getEventStatus: FetchStatus.IDLE,
  getEventError: undefined,
  getEventResponse: undefined,
};

const eventSlice = createSlice({
  name: "event",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getEvents: (state, _action: GetEventsAction) => {
      state.getEventStatus = FetchStatus.FETCHING;
      state.getEventError = "";
    },
    getEventsSuccess: (state, action: GetEventsSuccessAction) => {
      state.getEventStatus = FetchStatus.SUCCESS;
      state.getEventResponse = action.payload.response;
    },
    getEventsFailure: (state, action: GetEventsFailureAction) => {
      state.getEventStatus = FetchStatus.FAILURE;
      state.getEventError = action.payload.error;
    },

    resetEvent: () => {
      return initState;
    },
  },
});

export const eventActions = eventSlice.actions;

export const eventReducer = eventSlice.reducer;
