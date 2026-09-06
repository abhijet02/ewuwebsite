import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetProgramCategoriesRequest,
  GetProgramCategoriesResponse,
} from "./programCategory.service.type";

export const programCategoryService = {
  getProgramCategories: async (
    getProgramCategoriesRequest: GetProgramCategoriesRequest
  ): Promise<Response<GetProgramCategoriesResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query ProgramCategories( $page: Float!, $limit: Float! ) {
          programCategories ( page: $page, limit: $limit ) {
            id,
            title,
            order,
            programDetails,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          page: getProgramCategoriesRequest.page,
          limit: 100000,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
