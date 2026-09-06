import { axiosClient, BASE_URL } from "../axiosClient";
import { Response } from "../response.type";

import {
  GetQuickLinkRequest,
  GetQuickLinkResponse,
  QuickLink,
} from "./quickLink.service.type";

export const quickLinkService = {
  getQuickLink: async (
    getQuickLinkRequest: GetQuickLinkRequest
  ): Promise<Response<GetQuickLinkResponse>> => {
    try {
      const url: string = BASE_URL!;

      const jsonData = {
        query: `query AllQuickLinks($page: Float!, $limit:Float!) {
          allQuickLinks(page: $page, limit: $limit){
              id,
              label,
              url,
              category,
              createdAt,
              updateAt,
           }
         }`,
        variables: {
          page: getQuickLinkRequest.page,
          limit: getQuickLinkRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
