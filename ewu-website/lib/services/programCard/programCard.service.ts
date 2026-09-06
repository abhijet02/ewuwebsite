import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetProgramCardRequest,
  GetProgramCardResponse,
} from "./programCard.service.type";

export const programCardService = {
  getProgramCard: async (
    getProgramCardRequest: GetProgramCardRequest
  ): Promise<Response<GetProgramCardResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query ProgramCards ($page: Int, $limit:Int) {
          programCards (page: $page, limit: $limit) {
            id
            pageId
            title
            link
            logoLink
            isPublished
            createdAt
            updateAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          page: getProgramCardRequest.page,
          limit: getProgramCardRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
