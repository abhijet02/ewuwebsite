import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetProcurementsRequest,
  GetProcurementsResponse,
} from "./procurement.service.type";

export const procurementService = {
  getProcurements: async (
    getProcurementsRequest: GetProcurementsRequest
  ): Promise<Response<GetProcurementsResponse>> => {
    try {
      const url: string = BASE_URL || "";
      const jsonData = {
        query: `query Procurements($page: Int!, $limit: Int!) {
          procurements(page: $page, limit: $limit) {
            id
            title
            fileUrl
            publishDate
            isArchived
            isPublished
            createdAt
            updatedAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          page: getProcurementsRequest.page,
          limit: getProcurementsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
