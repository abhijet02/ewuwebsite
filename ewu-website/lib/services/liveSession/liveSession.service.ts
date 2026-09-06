import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  CreateLiveSessionRequest,
  CreateLiveSessionResponse,
  GetLiveSessionsRequest,
  GetLiveSessionsResponse,
  RemoveLiveSessionRequest,
  RemoveLiveSessionResponse,
  UpdateLiveSessionRequest,
  UpdateLiveSessionResponse,
} from "./liveSession.service.type";

export const liveSessionService = {
  getLiveSessions: async (
    getLiveSessionsRequest: GetLiveSessionsRequest,
  ): Promise<Response<GetLiveSessionsResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query liveSessions ($page: Int, $limit:Int) {
          liveSessions (page: $page, limit: $limit) {
            id
            title
            platform
            link
            expiryDate
            isPublished
            createdAt
            updateAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          page: getLiveSessionsRequest.page,
          limit: getLiveSessionsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  createLiveSession: async (
    createLiveSessionRequest: CreateLiveSessionRequest,
  ): Promise<Response<CreateLiveSessionResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `mutation CreateLiveSession (
          $title: String!
          $platform: String
          $link: String
          $expiryDate: String
          $isPublished: Publish!,
        ) {
          createLiveSession (
            createLiveSessionInput: {
              title: $title,
              platform: $platform,
              link: $link,
              expiryDate: $expiryDate,
              isPublished: $isPublished,
            }
          ) {
            id
            title
            platform
            link
            expiryDate
            isPublished
            createdAt
            updateAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          title: createLiveSessionRequest.title,
          platform: createLiveSessionRequest.platform,
          link: createLiveSessionRequest.link,
          expiryDate: createLiveSessionRequest.expiryDate,
          isPublished: createLiveSessionRequest.isPublished,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  updateLiveSession: async (
    updateLiveSessionRequest: UpdateLiveSessionRequest,
  ): Promise<Response<UpdateLiveSessionResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `mutation UpdateLiveSession (
          $id: Int!
          $title: String!
          $platform: String
          $link: String
          $expiryDate: String
          $isPublished: Publish!,
        ) {
          updateLiveSession (
            updateLiveSessionInput: {
              id: $id
              title: $title,
              platform: $platform,
              link: $link,
              expiryDate: $expiryDate,
              isPublished: $isPublished,
            }
          ) {
            id
            title
            platform
            link
            expiryDate
            isPublished
            createdAt
            updateAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          id: updateLiveSessionRequest.id,
          title: updateLiveSessionRequest.title,
          platform: updateLiveSessionRequest.platform,
          link: updateLiveSessionRequest.link,
          expiryDate: updateLiveSessionRequest.expiryDate,
          isPublished: updateLiveSessionRequest.isPublished,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  removeLiveSession: async (
    removeLiveSessionRequest: RemoveLiveSessionRequest,
  ): Promise<Response<RemoveLiveSessionResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `mutation RemoveLiveSession ($id: Int!) {
          removeLiveSession (id: $id) {
            id
            title
            platform
            link
            expiryDate
            isPublished
            createdAt
            updateAt
            createdBy
            updatedBy
          }
        }`,
        variables: { id: removeLiveSessionRequest.id },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
