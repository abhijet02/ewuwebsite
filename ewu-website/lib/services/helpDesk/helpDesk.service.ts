import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetHelpDesksRequest,
  GetHelpDesksResponse,
} from "./helpDesk.service.type";

export const helpDeskService = {
  getHelpDesks: async (
    getHelpDeskRequest: GetHelpDesksRequest
  ): Promise<Response<GetHelpDesksResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query allHelpDesk ( $page: Float!, $limit:Float! ) {
          allHelpDesk (page: $page, limit: $limit) {
            id,
            name,
            email,
            departmentId,
            link,
            iconPath,
            isContact,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
            }
          }`,
        variables: {
          page: getHelpDeskRequest.page,
          limit: getHelpDeskRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
