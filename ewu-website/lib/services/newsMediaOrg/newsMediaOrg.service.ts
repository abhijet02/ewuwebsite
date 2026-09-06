import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetNewsMediaOrgRequest,
  GetNewsMediaOrgResponse,
} from "./newsMediaOrg.service.type";

export const newsMediaOrgService = {
  getNewsMediaOrg: async (
    getNewsMediaOrgRequest: GetNewsMediaOrgRequest
  ): Promise<Response<GetNewsMediaOrgResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query NewsMediaOrgs {
          newsMediaOrgs {
            id
            newsMediaId
            title
            link
            thumbnail
            createdAt
            updatedAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          page: getNewsMediaOrgRequest.page,
          limit: getNewsMediaOrgRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
