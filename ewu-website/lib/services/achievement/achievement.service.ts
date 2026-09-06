import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetAchievementsRequest,
  GetAchievementsResponse,
} from "./achievement.service.type";

export const achievementService = {
  getAchievements: async (
    getAchievementsRequest: GetAchievementsRequest
  ): Promise<Response<GetAchievementsResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query AllAchievement ( $page: Float, $limit:Float, $pageId: Float ) {
          allAchievements ( page: $page, limit: $limit, pageId: $pageId ) {
            id,
            pageId,
            category,
            label,
            date,
            description,
            thumbnail,
            isMarquee,
            isPublished,
            isArchived,
            isApprovedByAdmin,
            photos {
              id,
              achievementId,
              url,
              createdAt,
              updatedAt,
            },
            slug,
            order,
            isCopiedTo,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          page: getAchievementsRequest.page,
          limit: getAchievementsRequest.limit,
          pageId: getAchievementsRequest.pageId,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
