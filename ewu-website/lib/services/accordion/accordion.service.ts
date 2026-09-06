import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetAccordionsRequest,
  GetAccordionsResponse,
} from "./accordion.service.type";

export const accordionService = {
  getAccordions: async (
    getAccordionRequest: GetAccordionsRequest
  ): Promise<Response<GetAccordionsResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query Accordions {
          accordions {
            id,
            pageId,
            title,
            color,
            section,
            col,
            description,
            isPublished
            }
          }`,
        variables: {
          page: getAccordionRequest.page,
          limit: getAccordionRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
