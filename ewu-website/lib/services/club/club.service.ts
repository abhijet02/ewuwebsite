import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import { GetClubsRequest, GetClubsResponse } from "./club.service.type";

export const clubService = {
  getClubs: async (
    getClubsRequest: GetClubsRequest
  ): Promise<Response<GetClubsResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query AllClub ( $page: Float!, $limit:Float!) {
          allClub ( page: $page, limit: $limit ) {
                id,
                slug,
                title,
                order,
                introduction,
                mission,
                vission,
                logoUrl,
                primaryColor,
                secondaryColor,
                createdAt,
                updatedAt,
                createdBy,
                updatedBy,
          }
        }`,
        variables: {
          page: getClubsRequest.page,
          limit: getClubsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
