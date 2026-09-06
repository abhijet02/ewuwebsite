import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetViewAllsRequest,
  GetViewAllsResponse,
} from "./viewAll.service.type";

export const viewAllService = {
  getViewAlls: async (
    getViewAllRequest: GetViewAllsRequest
  ): Promise<Response<GetViewAllsResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query ViewAlls($page: Float!, $limit: Float!) {
          viewAlls(page: $page, limit: $limit) {
            id,
            componentId,
            pageId,
            viewAllLink,
            createdAt,
            updateAt,
            createdBy,
            updatedBy
          }
        }`,
        variables: {
          page: getViewAllRequest.page,
          limit: getViewAllRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
