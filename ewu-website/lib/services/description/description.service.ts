import {
  axiosClient,
  BASE_URL,
} from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetDescriptionsRequest,
  GetDescriptionsResponse,
} from "./description.service.type";

export const descriptionService = {
  getDescriptions: async (
    getDescriptionsRequest: GetDescriptionsRequest,
  ): Promise<Response<GetDescriptionsResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query Descriptions ( $page: Int!, $limit:Int! ){
          descriptions( page: $page, limit: $limit ) {
            id
            pageId
            title
            description
            isPublished
          }
        }`,
        variables: {
          page: getDescriptionsRequest.page,
          limit: getDescriptionsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
