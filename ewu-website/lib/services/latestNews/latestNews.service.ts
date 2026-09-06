import { axiosClient, BASE_URL } from "../axiosClient";
import { Response } from "../response.type";

import {
  GetLatestNewsRequest,
  GetLatestNewsResponse,
} from "./latestNews.service.type";

export const latestNewsService = {
  getLatestNews: async (
    getLatestNewsRequest: GetLatestNewsRequest
  ): Promise<Response<GetLatestNewsResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query LatestNews($page: Float!, $limit:Float!) {
          latestNews(page: $page, limit: $limit){
              id,
              pageId,
              isCopiedTo,
              label,
              link,
              isPublished,
              order,
              entryDate,
              expierDate,
              createdAt,
              updateAt,
           }
         }`,
        variables: {
          page: getLatestNewsRequest.page,
          limit: getLatestNewsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
