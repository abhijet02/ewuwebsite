import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetPartnershipsRequest,
  GetPartnershipsResponse,
  Partnership,
} from "./partnership.service.type";

export const partnershipService = {
  getPartnerships: async (
    getPartnershipsRequest: GetPartnershipsRequest
  ): Promise<Response<GetPartnershipsResponse>> => {
    try {
      const url: string = BASE_URL;
      const jsonData = {
        query: `query Patnerships($page: Float!, $limit: Float!) {
          patnerships(page: $page, limit: $limit) {
            id
            pageId
            name
            logoUrl
            isPublished
            origin
            websiteLink
            createdAt
            updatedAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          page: getPartnershipsRequest.page,
          limit: getPartnershipsRequest.limit,
        },
      };
      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
