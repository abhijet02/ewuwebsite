import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import { GetHotlineRequest, GetHotlineResponse } from "./hotline.service.type";

export const hotlineService = {
  getHotline: async (
    getHotlineRequest: GetHotlineRequest
  ): Promise<Response<GetHotlineResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query Hotlines ($page: Int, $limit:Int) {
          hotlines (page: $page, limit: $limit) {
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
          page: getHotlineRequest.page,
          limit: getHotlineRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
