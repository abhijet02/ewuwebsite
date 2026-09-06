import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetYearlyViewsRequest,
  GetYearlyViewsResponse,
} from "./yearlyView.service.type";

export const yearlyViewService = {
  getYearlyViews: async (
    getYearlyViewsRequest: GetYearlyViewsRequest
  ): Promise<Response<GetYearlyViewsResponse>> => {
    try {
      const url = BASE_URL;

      const jsonData = {
        query: `query YearlyViews(
          $page: Float!,
          $limit: Float!
        ) {
          yearlyViews(page: $page, limit: $limit) {
            id,
            pageId,
            photoUrl,
            date,
            year,
            title,
            subTitle,
            attachment1Url,
            attachment1Name,
            attachment2Url,
            attachment2Name,
            yearlyViewAttachment {
              id,
              yearlyViewId,
              attachmentUrl,
              attachmentName,
            },
            isPublished,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy
          }
        }`,
        variables: {
          page: getYearlyViewsRequest.page,
          limit: getYearlyViewsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, jsonData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
