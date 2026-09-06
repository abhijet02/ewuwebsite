import { axiosClient, BASE_URL } from "@/lib/services/axiosClient";
import { Response } from "../response.type";
import {
  GetQuotesRequest,
  GetQuotesResponse,
  Quote,
} from "./quote.service.type";

export const quoteService = {
  getQuotes: async (
    getQuotesRequest: GetQuotesRequest
  ): Promise<Response<GetQuotesResponse>> => {
    try {
      const url: string = BASE_URL!;

      const jsonData = {
        query: `query Quotes ( $page: Float!, $limit:Float!) {
          Quotes ( page: $page, limit: $limit ) {
            id,
            pageId,
            name,
            designation,
            quote,
            url,
            imageUrl,
            nextThumbnailUrl,
          }
        }`,
        variables: {
          page: getQuotesRequest.page,
          limit: getQuotesRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
