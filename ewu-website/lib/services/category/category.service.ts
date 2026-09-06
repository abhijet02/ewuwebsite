import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetCategoriesRequest,
  GetCategoriesResponse,
} from "./category.service.type";

export const categoryService = {
  getCategories: async (
    getCategoriesRequest: GetCategoriesRequest
  ): Promise<Response<GetCategoriesResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query Categories( $page: Float!, $limit:Float! ) {
          categories ( page: $page, limit: $limit ){
            id
            category
            componentId
          }
        }`,
        variables: {
          page: getCategoriesRequest.page,
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
