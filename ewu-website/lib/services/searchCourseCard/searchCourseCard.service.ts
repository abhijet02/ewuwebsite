import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetSearchCourseCardRequest,
  GetSearchCourseCardResponse,
} from "./searchCourseCard.service.type";

export const searchCourseCardService = {
  getSearchCourseCard: async (
    getSearchCourseCardRequest: GetSearchCourseCardRequest
  ): Promise<Response<GetSearchCourseCardResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query SearchCourseCards ($page: Int, $limit:Int) {
          searchCourseCards (page: $page, limit: $limit) {
            id
            title
            subTitle
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
          page: getSearchCourseCardRequest.page,
          limit: getSearchCourseCardRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
