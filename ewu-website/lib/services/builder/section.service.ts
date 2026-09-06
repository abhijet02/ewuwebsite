import { BASE_URL, axiosClient } from "../axiosClient";
import { Response } from "@/lib/services/response.type";
import {
  GetSectionsRequest,
  GetSectionsResponse,
} from "./section.service.type";

export const sectionService = {
  getSections: async (
    getSectionsRequest: GetSectionsRequest
  ): Promise<Response<GetSectionsResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query Sections($page: Float!, $limit: Float!) {
          sections(page: $page, limit: $limit) {
            id,
            pageId,
            secetionOrder,
            sectionTitle,
            sectionSubTitle,
            sectionBackgroundColor,
            columRatio,
            columnOrder,
            componentId,
          }
        }`,
        variables: {
          page: getSectionsRequest.page,
          limit: getSectionsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
