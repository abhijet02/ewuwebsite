import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetClubActivityRankingsRequest,
  GetClubActivityRankingsResponse,
} from "./clubActivityRanking.service.type";

export const clubActivityRankingService = {
  getClubActivityRankings: async (
    getClubActivityRankingsRequest: GetClubActivityRankingsRequest
  ): Promise<Response<GetClubActivityRankingsResponse>> => {
    try {
      const url: string = BASE_URL || "";
      const jsonData = {
        query: `query AllClubActivityRanking ( $page: Float!, $limit: Float! ) {
          allClubActivityRanking ( page: $page, limit: $limit ) {
            id,
            clubId,
            groomingSessionCount,
            groomingSessionShortDescription,
            competitionCount,
            competitionShortDescription,
            seminerCount,
            seminerShortDescription,
            workshopCount,
            workshopShortDescription,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          page: getClubActivityRankingsRequest.page,
          limit: getClubActivityRankingsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
