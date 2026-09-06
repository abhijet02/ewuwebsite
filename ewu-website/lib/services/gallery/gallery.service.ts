import {
  axiosClient,
  axiosFormDataClient,
  BASE_URL,
} from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  CreateGalleryRequest,
  GetGallerysRequest,
  GetGallerysResponse,
  Gallery,
  RemoveGalleryRequest,
  RemoveGalleryResponse,
  UpdateGalleryRequest,
} from "./gallery.service.type";

export const galleryService = {
  getGallerys: async (
    getGallerysRequest: GetGallerysRequest
  ): Promise<Response<GetGallerysResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query galleries($page: Float!, $limit: Float!) {
          galleries(page: $page, limit: $limit) {
            id
            date
            pageId
            title
            slug
            description
            category
            year
            order
            mediaUrl
            galleryPhoto {
              id
              gallaryId
              mediaUrl
              createdAt
              updateAt
              createdBy
              updatedBy
            }
            isPublished
            createdAt
            updateAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          page: getGallerysRequest.page,
          limit: getGallerysRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  createGallery: async (
    createGalleryRequest: CreateGalleryRequest
  ): Promise<Response<Gallery>> => {
    try {
      const url: string = BASE_URL || "";
      const formData = new FormData();

      const jsonData = {
        query: `mutation CreateGallery(
          $pageId: Int!,
          $title: String,
          $slug: String,
          $category: String,
          $year: String,
          $order: Int,
          $description: String,
          $mediaUrl: Upload
          $isPublished: Publish!
          $galleryPhoto: [Upload!]
        ) {
          createGallery(
            createGalleryInput: {
              pageId: $pageId,
              title: $title,
              slug: $slug,
              category: $category,
              year: $year,
              order: $order,
              description: $description,
              mediaUrl: $mediaUrl
              isPublished: $isPublished
              galleryPhoto: $galleryPhoto
            }
          ) {
            id
            date
            pageId
            title
            slug
            category
            year
            order
            description
            mediaUrl
            galleryPhoto {
              id
              gallaryId
              mediaUrl
              createdAt
              updateAt
              createdBy
              updatedBy
            }
            isPublished
            createdAt
            updateAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          pageId: Number(createGalleryRequest.pageId),
          title: createGalleryRequest.title,
          slug: createGalleryRequest.slug,
          category: createGalleryRequest.category,
          year: createGalleryRequest.year,
          order: Number(createGalleryRequest.order),
          description: createGalleryRequest.description,
          isPublished: createGalleryRequest.isPublished,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      let fileMap = {};
      let hasFiles = false;

      if (createGalleryRequest.mediaUrl) {
        fileMap["0"] = ["variables.mediaUrl"];
        hasFiles = true;
      }

      if (
        createGalleryRequest.galleryPhoto &&
        createGalleryRequest.galleryPhoto.length
      ) {
        for (let i = 0; i < createGalleryRequest.galleryPhoto.length; i++) {
          fileMap[`${i + 2}`] = [`variables.galleryPhoto.${i}`];
          hasFiles = true;
        }
      }

      formData.append("map", hasFiles ? JSON.stringify(fileMap) : "{}");

      if (createGalleryRequest.mediaUrl) {
        formData.append("0", createGalleryRequest.mediaUrl);
      }

      if (
        createGalleryRequest.galleryPhoto &&
        createGalleryRequest.galleryPhoto.length
      ) {
        for (let i = 0; i < createGalleryRequest.galleryPhoto.length; i++) {
          formData.append(`${i + 2}`, createGalleryRequest.galleryPhoto[i]);
        }
      }

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  updateGallery: async (
    updateGalleryRequest: UpdateGalleryRequest
  ): Promise<Response<Gallery>> => {
    try {
      const url: string = BASE_URL || "";
      const formData = new FormData();

      const jsonData = {
        query: `mutation UpdateGallery(
          $id: Int!,
          $pageId: Int,
          $title: String,
          $slug: String,
          $category: String,
          $year: String,
          $order: Int,
          $description: String,
          $mediaUrl: Upload
          $isPublished: Publish!
          $galleryPhoto: [Upload!]
        ) {
          updateGallery(
            updateGalleryInput: {
              id: $id,
              pageId: $pageId,
              title: $title,
              slug: $slug,
              category: $category,
              year: $year,
              order: $order,
              description: $description,
              mediaUrl: $mediaUrl
              isPublished: $isPublished
              galleryPhoto: $galleryPhoto
            }
          ) {
            id
            date
            pageId
            title
            slug
            category
            year
            order
            description
            mediaUrl
            galleryPhoto {
              id
              gallaryId
              mediaUrl
              createdAt
              updateAt
              createdBy
              updatedBy
            }
            isPublished
            createdAt
            updateAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          id: Number(updateGalleryRequest.id),
          pageId: updateGalleryRequest.pageId
            ? Number(updateGalleryRequest.pageId)
            : undefined,
          title: updateGalleryRequest.title,
          slug: updateGalleryRequest.slug,
          category: updateGalleryRequest.category,
          year: updateGalleryRequest.year,
          order: Number(updateGalleryRequest.order),
          description: updateGalleryRequest.description,
          isPublished: updateGalleryRequest.isPublished,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      let fileMap = {};
      let hasFiles = false;

      if (updateGalleryRequest?.mediaUrl) {
        fileMap["0"] = ["variables.mediaUrl"];
        hasFiles = true;
      }

      if (
        updateGalleryRequest?.galleryPhoto &&
        updateGalleryRequest?.galleryPhoto.length
      ) {
        for (let i = 0; i < updateGalleryRequest.galleryPhoto.length; i++) {
          fileMap[`${i + 2}`] = [`variables.galleryPhoto.${i}`];
          hasFiles = true;
        }
      }

      formData.append("map", hasFiles ? JSON.stringify(fileMap) : "{}");

      if (updateGalleryRequest?.mediaUrl) {
        formData.append("0", updateGalleryRequest.mediaUrl);
      }

      if (
        updateGalleryRequest?.galleryPhoto &&
        updateGalleryRequest?.galleryPhoto?.length
      ) {
        for (let i = 0; i < updateGalleryRequest.galleryPhoto.length; i++) {
          formData.append(`${i + 2}`, updateGalleryRequest.galleryPhoto[i]);
        }
      }

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  removeGallery: async (
    removeGalleryRequest: RemoveGalleryRequest
  ): Promise<Response<RemoveGalleryResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `mutation RemoveGallery($id: Float!) {
          removeGallery(id: $id) {
            id
            date
            pageId
            title
            slug
            category
            year
            order
            description
            mediaUrl
            galleryPhoto {
              id
              gallaryId
              mediaUrl
              createdAt
              updateAt
              createdBy
              updatedBy
            }
            isPublished
            createdAt
            updateAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          id: Number(removeGalleryRequest.id),
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
