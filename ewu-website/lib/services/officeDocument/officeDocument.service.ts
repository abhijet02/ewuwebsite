import {
  axiosClient,
  axiosFormDataClient,
  BASE_URL,
} from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  CreateOfficeDocumentRequest,
  CreateOfficeDocumentResponse,
  GetOfficeDocumentsRequest,
  GetOfficeDocumentsResponse,
  RemoveOfficeDocumentRequest,
  RemoveOfficeDocumentResponse,
  UpdateOfficeDocumentRequest,
  UpdateOfficeDocumentResponse,
} from "./officeDocument.service.type";

export const officeDocumentService = {
  getOfficeDocuments: async (
    getOfficeDocumentsRequest: GetOfficeDocumentsRequest,
  ): Promise<Response<GetOfficeDocumentsResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query OfficeDocuments ($page: Int!, $limit: Int!) {
          officeDocuments (page: $page, limit: $limit) {
            id
            officeId
            order
            fileName
            fileUrl
            link
            createdAt
            updatedAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          page: getOfficeDocumentsRequest.page,
          limit: getOfficeDocumentsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  createOfficeDocument: async (
    createOfficeDocumentRequest: CreateOfficeDocumentRequest,
  ): Promise<Response<CreateOfficeDocumentResponse>> => {
    try {
      const url: string = BASE_URL || "";
      const formData = new FormData();

      const jsonData = {
        query: `mutation CreateOfficeDocument (
          $officeId: Int!
          $order: Int!
          $fileName: String
          $fileUrl: Upload
          $link: String
        ) {
          createOfficeDocument (
            createOfficeDocumentInput: {
              officeId: $officeId
              order: $order
              fileName: $fileName
              fileUrl: $fileUrl
              link: $link
            }
          ) {
            id
            officeId
            order
            fileName
            fileUrl
            link
            createdAt
            updatedAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          officeId: Number(createOfficeDocumentRequest.officeId),
          order: createOfficeDocumentRequest.order,
          fileName: createOfficeDocumentRequest.fileName,
          fileUrl: createOfficeDocumentRequest.fileUrl,
          link: createOfficeDocumentRequest.link,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      const fileMap: Record<string, string[]> = {};
      let fileIndex = 0;

      if (createOfficeDocumentRequest.fileUrl) {
        fileMap[`${fileIndex}`] = ["variables.fileUrl"];
        fileIndex++;
      }

      formData.append("map", JSON.stringify(fileMap));

      fileIndex = 0;

      if (createOfficeDocumentRequest.fileUrl) {
        formData.append(`${fileIndex}`, createOfficeDocumentRequest.fileUrl);
        fileIndex++;
      }

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  updateOfficeDocument: async (
    updateOfficeDocumentRequest: UpdateOfficeDocumentRequest,
  ): Promise<Response<UpdateOfficeDocumentResponse>> => {
    try {
      const url: string = BASE_URL || "";
      const formData = new FormData();

      const jsonData = {
        query: `mutation UpdateOfficeDocument (
          $id: Int!,
          $officeId: Int!,
          $order: Int!
          $fileName: String
          $fileUrl: Upload
          $link: String
        ) {
          updateOfficeDocument (
            updateOfficeDocumentInput: {
              id: $id,
              officeId: $officeId
              order: $order
              fileName: $fileName
              fileUrl: $fileUrl
              link: $link
            }
          ) {
            id
            officeId
            order
            fileName
            fileUrl
            link
            createdAt
            updatedAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          id: updateOfficeDocumentRequest.id,
          officeId: Number(updateOfficeDocumentRequest.officeId),
          order: updateOfficeDocumentRequest.order,
          fileName: updateOfficeDocumentRequest.fileName,
          fileUrl: updateOfficeDocumentRequest.fileUrl,
          link: updateOfficeDocumentRequest.link,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      const fileMap: Record<string, string[]> = {};
      let fileIndex = 0;

      if (updateOfficeDocumentRequest.fileUrl) {
        fileMap[`${fileIndex}`] = ["variables.fileUrl"];
        fileIndex++;
      }

      formData.append("map", JSON.stringify(fileMap));

      fileIndex = 0;

      if (updateOfficeDocumentRequest.fileUrl) {
        formData.append(`${fileIndex}`, updateOfficeDocumentRequest.fileUrl);
        fileIndex++;
      }

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  removeOfficeDocument: async (
    removeOfficeDocumentRequest: RemoveOfficeDocumentRequest,
  ): Promise<Response<RemoveOfficeDocumentResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `mutation RemoveOfficeDocument ( $id: Int! ) {
          removeOfficeDocument ( id: $id ) {
            id
            officeId
            order
            fileName
            fileUrl
            link
            createdAt
            updatedAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          id: removeOfficeDocumentRequest.id,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
