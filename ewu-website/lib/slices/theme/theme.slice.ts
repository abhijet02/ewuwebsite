import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { value: "light" },
  reducers: {
    setDarkMode: (state) => {
      state.value = "dark";
    },
    setLightMode: (state) => {
      state.value = "light";
    },
    toggleMode: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
    },
    resetTheme: (state) => {
      state.value = "light"; // default state
    },
  },
});

export const { setDarkMode, setLightMode, toggleMode, resetTheme } =
  themeSlice.actions;
export const themeReducer = themeSlice.reducer;
