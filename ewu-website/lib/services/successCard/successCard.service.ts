import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetSuccessCardRequest,
  GetSuccessCardResponse,
} from "./successCard.service.type";

export const successCardService = {
  getSuccessCard: async (
    getSuccessCardRequest: GetSuccessCardRequest
  ): Promise<Response<GetSuccessCardResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query SuccessCards ($page: Int, $limit:Int) {
          successCards (page: $page, limit: $limit) {
            id
            title
            countLabel
            logoLink
            isPublished
            createdAt
            updateAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          page: getSuccessCardRequest.page,
          limit: getSuccessCardRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
