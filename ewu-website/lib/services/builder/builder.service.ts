import { Response } from "@/lib/services/response.type";
import { BASE_URL, axiosClient } from "../axiosClient";
import {
  GetBuildersRequest,
  GetBuildersResponse,
} from "./builder.service.type";

export const builderService = {
  getBuilders: async (
    getBuildersRequest: GetBuildersRequest
  ): Promise<Response<GetBuildersResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query Builders($page: Float!, $limit: Float!) {
          builders(page: $page, limit: $limit) {
            id,
            pageId,
            isLatestNewsEnable,
            isHeaderEnable,
            isHeader2Enable,
            isHeader3Enable,
            isClubHeaderEnable,
            isSliderEnable,
            isFooterEnable,
            isFooter2Enable,
            isFooter3Enable,
            isClubFooterEnable,
            sectionCount,
            createdAt,
            updateAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          page: getBuildersRequest.page,
          limit: getBuildersRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
