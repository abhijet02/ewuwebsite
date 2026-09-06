import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetCampusLifeRequest,
  GetCampusLifeResponse,
  GetCampusLifesRequest,
  GetCampusLifesResponse,
} from "./campusLife.service.type";

export const campusLifeService = {
  getCampusLifes: async (
    getCampusLifesRequest: GetCampusLifesRequest
  ): Promise<Response<GetCampusLifesResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query CampusLifeContents($page: Float!, $limit: Float!) {
          campusLifeContents(page: $page, limit: $limit) {
            id
            pageId
            title
            subtitle
            link
            mediaUrl
            description
            isPublished
            createdAt
            updateAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          page: getCampusLifesRequest.page,
          limit: getCampusLifesRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  getCampusLife: async (
    getCampusLifeRequest: GetCampusLifeRequest
  ): Promise<Response<GetCampusLifeResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query CampusLifeContent($id: Float!) {
          campusLifeContent(id: $id) {
            id
            pageId
            title
            subtitle
            link
            mediaUrl
            description
            isPublished
            createdAt
            updateAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          id: getCampusLifeRequest.id,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
