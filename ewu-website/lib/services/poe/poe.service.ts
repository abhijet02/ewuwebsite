import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import { GetPoesRequest, GetPoesResponse } from "./poe.service.type";

export const poeService = {
  getPoes: async (
    getPoesRequest: GetPoesRequest
  ): Promise<Response<GetPoesResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query Poes($page: Int!, $limit: Int!) {
          poes(page: $page, limit: $limit) {
            id,
            departmentId,
            description,
            title,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          page: getPoesRequest.page,
          limit: getPoesRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
