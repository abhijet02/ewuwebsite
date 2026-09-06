import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import { GetOfficesRequest, GetOfficesResponse } from "./office.service.type";

export const officeService = {
  getOffices: async (
    getOfficesRequest: GetOfficesRequest
  ): Promise<Response<GetOfficesResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query Offices ( $page: Float!, $limit:Float! ) {
          offices ( page: $page, limit: $limit ) {
            id,
            slug,
            isBOT,
            isAuthority,
            isDepartmental,
            departmentId,
            title,
            description,
            location,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          page: getOfficesRequest.page,
          limit: getOfficesRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
