import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  SliderSliceState,
  GetSlidersAction,
  GetSlidersSuccessAction,
  GetSlidersFailureAction,
  SetVideoMutedAction,
  ToggleVideoMutedAction,
} from "./slider.type";

const initState: SliderSliceState = {
  getSlidersStatus: FetchStatus.IDLE,
  getSlidersError: undefined,
  getSlidersResponse: undefined,
  isVideoMuted: true,
};

const sliderSlice = createSlice({
  name: "slider",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getSliders: (state, _action: GetSlidersAction) => {
      state.getSlidersStatus = FetchStatus.FETCHING;
      state.getSlidersError = "";
    },
    getSlidersSuccess: (state, action: GetSlidersSuccessAction) => {
      state.getSlidersStatus = FetchStatus.SUCCESS;
      state.getSlidersResponse = action.payload.response;
    },
    getSlidersFailure: (state, action: GetSlidersFailureAction) => {
      state.getSlidersStatus = FetchStatus.FAILURE;
      state.getSlidersError = action.payload.error;
    },

    // Add video mute actions
    setVideoMuted: (state, action: SetVideoMutedAction) => {
      state.isVideoMuted = action.payload.isMuted;
    },
    toggleVideoMuted: (state, _action: ToggleVideoMutedAction) => {
      state.isVideoMuted = !state.isVideoMuted;
    },

    resetSlider: () => {
      return initState;
    },
  },
});

export const sliderActions = sliderSlice.actions;
export const sliderReducer = sliderSlice.reducer;
