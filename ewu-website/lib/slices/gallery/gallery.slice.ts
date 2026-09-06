import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@services/fetch.type";
import {
  GallerySliceState,
  CreateGalleryAction,
  CreateGalleryFailureAction,
  CreateGallerySuccessAction,
  RemoveGalleryAction,
  RemoveGalleryFailureAction,
  RemoveGallerySuccessAction,
  UpdateGalleryAction,
  UpdateGalleryFailureAction,
  UpdateGallerySuccessAction,
  GetGallerysAction,
  GetGallerysFailureAction,
  GetGallerysSuccessAction,
} from "./gallery.type";

const initState: GallerySliceState = {
  getGallerysStatus: FetchStatus.IDLE,
  getGallerysError: undefined,
  getGallerysResponse: undefined,
  createGalleryStatus: FetchStatus.IDLE,
  createGalleryError: undefined,
  createGalleryResponse: undefined,
  updateGalleryStatus: FetchStatus.IDLE,
  updateGalleryError: undefined,
  updateGalleryResponse: undefined,
  removeGalleryStatus: FetchStatus.IDLE,
  removeGalleryError: undefined,
  removeGalleryResponse: undefined,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getGallerys: (state, _action: GetGallerysAction) => {
      state.getGallerysStatus = FetchStatus.FETCHING;
      state.getGallerysError = "";
    },
    getGallerysSuccess: (state, action: GetGallerysSuccessAction) => {
      state.getGallerysStatus = FetchStatus.SUCCESS;
      state.getGallerysResponse = action.payload.response;
    },
    getGallerysFailure: (state, action: GetGallerysFailureAction) => {
      state.getGallerysStatus = FetchStatus.FAILURE;
      state.getGallerysError = action.payload.error;
    },

    createGallery: (state, _action: CreateGalleryAction) => {
      state.createGalleryStatus = FetchStatus.FETCHING;
      state.createGalleryError = "";
    },
    createGallerySuccess: (state, action: CreateGallerySuccessAction) => {
      state.createGalleryStatus = FetchStatus.SUCCESS;
      state.createGalleryResponse = action.payload.response;
    },
    createGalleryFailure: (state, action: CreateGalleryFailureAction) => {
      state.createGalleryStatus = FetchStatus.FAILURE;
      state.createGalleryError = action.payload.error;
    },

    updateGallery: (state, _action: UpdateGalleryAction) => {
      state.updateGalleryStatus = FetchStatus.FETCHING;
      state.updateGalleryError = "";
    },
    updateGallerySuccess: (state, action: UpdateGallerySuccessAction) => {
      state.updateGalleryStatus = FetchStatus.SUCCESS;
      state.updateGalleryResponse = action.payload.response;
    },
    updateGalleryFailure: (state, action: UpdateGalleryFailureAction) => {
      state.updateGalleryStatus = FetchStatus.FAILURE;
      state.updateGalleryError = action.payload.error;
    },

    removeGallery: (state, _action: RemoveGalleryAction) => {
      state.removeGalleryStatus = FetchStatus.FETCHING;
      state.removeGalleryError = "";
    },
    removeGallerySuccess: (state, action: RemoveGallerySuccessAction) => {
      state.removeGalleryStatus = FetchStatus.SUCCESS;
      state.removeGalleryResponse = action.payload.response;
    },
    removeGalleryFailure: (state, action: RemoveGalleryFailureAction) => {
      state.removeGalleryStatus = FetchStatus.FAILURE;
      state.removeGalleryError = action.payload.error;
    },

    resetGallery: () => {
      return initState;
    },
  },
});

export const galleryActions = gallerySlice.actions;
export const galleryReducer = gallerySlice.reducer;
