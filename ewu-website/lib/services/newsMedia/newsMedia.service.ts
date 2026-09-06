import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetNewsMediaRequest,
  GetNewsMediaResponse,
} from "./newsMedia.service.type";

export const newsMediaService = {
  getNewsMedia: async (
    getNewsMediaRequest: GetNewsMediaRequest
  ): Promise<Response<GetNewsMediaResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query AllNewsMedia ( $page: Int, $limit: Int) {
          allNewsMedia ( page: $page, limit: $limit ) {
            id
            pageId
            label
            description
            category
            slug
            date
            thumbnail
            link
            isArchived
            isPublished
            createdAt
            updatedAt
            createdBy
            updatedBy
            files {
                id
                newsMediaId
                orgName
                thumbNailUrl
                fileUrl
                link
                createdAt
                updatedAt
                createdBy
                updatedBy
            }
          }
        }`,
        variables: {
          page: getNewsMediaRequest.page,
          limit: getNewsMediaRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
