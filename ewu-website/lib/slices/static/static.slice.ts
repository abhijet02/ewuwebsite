import { createSlice } from "@reduxjs/toolkit";

const staticSlice = createSlice({
  name: "static",
  initialState: { value: false },
  reducers: {
    setStaticMode: (state) => {
      state.value = true;
    },
    setNormalMode: (state) => {
      state.value = false;
    },
    toggleStatic: (state) => {
      state.value = !state.value;
    },
    resetStatic: (state) => {
      state.value = false; // default = dynamic/normal
    },
  },
});

export const { setStaticMode, setNormalMode, toggleStatic, resetStatic } =
  staticSlice.actions;
export const staticReducer = staticSlice.reducer;
