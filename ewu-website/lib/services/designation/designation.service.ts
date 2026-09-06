import { axiosClient, BASE_URL } from "@/lib/services/axiosClient";
import { Response } from "@/lib/services/response.type";
import {
  GetDesignationsRequest,
  GetDesignationsResponse,
} from "./designation.service.type";

export const designationService = {
  getDesignations: async (
    getDesignationsRequest: GetDesignationsRequest
  ): Promise<Response<GetDesignationsResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query Designations ( $page: Float!, $limit:Float! ) {
          designations ( page: $page, limit: $limit ){
            id,
            designation,
            order,
            isClub,
            isOffice,
            isfaculty
          }
        }`,
        variables: {
          page: getDesignationsRequest.page,
          limit: getDesignationsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
