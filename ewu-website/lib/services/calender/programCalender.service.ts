import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetProgramCalendersRequest,
  GetProgramCalendersResponse,
} from "./programCalender.service.type";

export const programCalenderService = {
  getProgramCalenders: async (
    getRequest: GetProgramCalendersRequest
  ): Promise<Response<GetProgramCalendersResponse>> => {
    try {
      const url = BASE_URL;

      const jsonData = {
        query: `query ProgramCalenders($page: Float!, $limit: Float!) {
          ProgramCalenders(page: $page, limit: $limit) {
            id,
            year,
            label,
            order,
            isPublished,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          page: getRequest.page,
          limit: getRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
