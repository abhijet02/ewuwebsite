import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import { GetSkillsRequest, GetSkillsResponse } from "./skill.service.type";

export const skillService = {
  getSkills: async (
    getSkillsRequest: GetSkillsRequest
  ): Promise<Response<GetSkillsResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query Skills ( $page: Int!, $limit: Int! ) {
          skills ( page: $page, limit: $limit ) {
            id,
            clubId,
            title,
            description,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          page: getSkillsRequest.page,
          limit: getSkillsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
