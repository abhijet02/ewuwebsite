export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface GalleryPhoto {
  id: number;
  gallaryId: number;
  mediaUrl: string;
  createdAt: Date;
  updateAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface Gallery {
  id: number;
  date: Date;
  pageId: number;
  title?: string;
  slug?: string;
  category?: string;
  year?: string;
  order?: number;
  description?: string;
  mediaUrl?: string;
  galleryPhoto: GalleryPhoto[];
  isPublished: Publish;
  createdAt: Date;
  updateAt: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface GetGallerysRequest {
  page: number;
  limit: number;
}

export interface GetGallerysResponse {
  galleries: Gallery[];
}

export interface CreateGalleryRequest {
  pageId: number;
  title?: string;
  slug?: string;
  category?: string;
  year?: string;
  order?: number;
  description?: string;
  mediaUrl?: Blob;
  isPublished?: Publish;
  galleryPhoto?: Blob[];
}

export interface CreateGalleryResponse {
  createGallery: Gallery;
}

export interface UpdateGalleryRequest extends CreateGalleryRequest {
  id: number;
}

export interface UpdateGalleryResponse {
  updateGallery: Gallery;
}

export interface RemoveGalleryRequest {
  id: number;
}

export interface RemoveGalleryResponse {
  removeGallery: Gallery;
}
