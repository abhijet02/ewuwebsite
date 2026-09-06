import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetFollowUsRequest,
  GetFollowUsResponse,
} from "./followUs.service.type";

export const followUsService = {
  getFollowUs: async (
    getFollowUsRequest: GetFollowUsRequest
  ): Promise<Response<GetFollowUsResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query FollowUsList ($page: Int, $limit:Int) {
          followUsList (page: $page, limit: $limit) {
            id
            title
            link
            logoLink
            order
            isPublished
            createdAt
            updateAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          page: getFollowUsRequest.page,
          limit: getFollowUsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
