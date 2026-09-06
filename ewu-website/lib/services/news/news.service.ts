import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetNewsBySlugRequest,
  GetNewsBySlugResponse,
  GetNewsRequest,
  GetNewsResponse,
  News,
} from "./news.service.type";

export const newsService = {
  getNews: async (
    getNewsRequest: GetNewsRequest
  ): Promise<Response<GetNewsResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query Allnews ( $page: Float, $limit:Float, $pageId: Float) {
          allnews ( page: $page, limit: $limit, pageId: $pageId ) {
            id,
            pageId,
            label,
            date,
            description,
            reporterName,
            thumbnail,
            isCopiedTo,
            isMarquee,
            isPublished,
            isArchived,
            isApprovedByAdmin,
            photos {
              id,
              newsId,
              url,
              createdAt,
              updatedAt,
            },
            slug,
            order,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          page: getNewsRequest.page,
          limit: getNewsRequest.limit,
          pageId: getNewsRequest.pageId,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  getNewsBySlug: async (
    getNewsBySlugRequest: GetNewsBySlugRequest
  ): Promise<Response<GetNewsBySlugResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query NewsBySlug ( $slug: String!) {
          newsBySlug ( slug: $slug ) {
            id,
            pageId,
            label,
            date,
            description,
            reporterName,
            thumbnail,
            isCopiedTo,
            isMarquee,
            isPublished,
            isArchived,
            isApprovedByAdmin,
            photos {
              id,
              newsId,
              url,
              createdAt,
              updatedAt,
            },
            slug,
            order,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          slug: getNewsBySlugRequest.slug,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
