import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetPublicationsRequest,
  GetPublicationsResponse,
} from "./publication.service.type";

export const publicationService = {
  getPublications: async (
    getPublicationsRequest: GetPublicationsRequest
  ): Promise<Response<GetPublicationsResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query Publications ( $page: Int!, $limit:Int! ) {
          publications ( page: $page, limit: $limit ) {
            id,
            facultyPersonId,
            title,
            details,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
            }
          }`,
        variables: {
          page: getPublicationsRequest.page,
          limit: getPublicationsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
