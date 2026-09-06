import { BaseAction } from "@lib/action.type";
import {
  GetGallerysResponse,
  GetGallerysRequest,
  CreateGalleryRequest,
  UpdateGalleryRequest,
  RemoveGalleryRequest,
  Gallery,
} from "@lib/services/gallery/gallery.service.type";
import { FetchStatus } from "@services/fetch.type";

export interface GallerySliceState {
  getGallerysStatus: FetchStatus;
  getGallerysError?: string;
  getGallerysResponse?: GetGallerysResponse;
  createGalleryStatus: FetchStatus;
  createGalleryError?: string;
  createGalleryResponse?: Gallery;
  updateGalleryStatus: FetchStatus;
  updateGalleryError?: string;
  updateGalleryResponse?: Gallery;
  removeGalleryStatus: FetchStatus;
  removeGalleryError?: string;
  removeGalleryResponse?: Gallery;
}

export interface GetGallerysAction extends BaseAction {
  payload: {
    request: GetGallerysRequest;
  };
}

export interface GetGallerysSuccessAction extends BaseAction {
  payload: {
    response: GetGallerysResponse;
  };
}

export interface GetGallerysFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface CreateGalleryAction extends BaseAction {
  payload: {
    request: CreateGalleryRequest;
  };
}

export interface CreateGallerySuccessAction extends BaseAction {
  payload: {
    response: Gallery;
  };
}

export interface CreateGalleryFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface UpdateGalleryAction extends BaseAction {
  payload: {
    request: UpdateGalleryRequest;
  };
}

export interface UpdateGallerySuccessAction extends BaseAction {
  payload: {
    response: Gallery;
  };
}

export interface UpdateGalleryFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

export interface RemoveGalleryAction extends BaseAction {
  payload: {
    request: RemoveGalleryRequest;
  };
}

export interface RemoveGallerySuccessAction extends BaseAction {
  payload: {
    response: Gallery;
  };
}

export interface RemoveGalleryFailureAction extends BaseAction {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
