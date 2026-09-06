import { createSlice } from "@reduxjs/toolkit";

const accessibilitySlice = createSlice({
  name: "accessibility",

  initialState: {
    theme: "light",
    mode: false,
    zoom: false,
    photo: true,
  },

  reducers: {
    setDarkMode: (state) => {
      state.theme = "dark";
    },
    setLightMode: (state) => {
      state.theme = "light";
    },
    toggleMode: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    resetTheme: (state) => {
      state.theme = "light";
    },

    setStaticMode: (state) => {
      state.mode = true;
    },
    setNormalMode: (state) => {
      state.mode = false;
    },
    toggleStatic: (state) => {
      state.mode = !state.mode;
    },
    resetStatic: (state) => {
      state.mode = false;
    },

    setZoomMode: (state) => {
      state.zoom = true;
    },
    setOutMode: (state) => {
      state.zoom = false;
    },
    toggleZoom: (state) => {
      if (!state.zoom) {
        document.body.style.zoom = "120%";
        document.body.classList.add("body-zoomed");
      } else {
        document.body.style.zoom = "100%";
        document.body.classList.remove("body-zoomed");
      }
      state.zoom = !state.zoom;
    },
    resetZoom: (state) => {
      state.zoom = false;
      document.body.style.zoom = "100%";
      document.body.classList.remove("body-zoomed");
    },

    setPhotoViewMode: (state) => {
      state.photo = true;
    },
    setPhotoHideMode: (state) => {
      state.photo = false;
    },
    togglePhotoView: (state) => {
      state.photo = !state.photo;
    },
    resetPhotoView: (state) => {
      state.photo = true;
    },
  },
});

export const accessibilityActions = accessibilitySlice.actions;
export const accessibilityReducer = accessibilitySlice.reducer;
