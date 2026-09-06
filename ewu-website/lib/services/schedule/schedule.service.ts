import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetSchedulesRequest,
  GetSchedulesResponse,
} from "./schedule.service.type";

export const scheduleService = {
  getSchedules: async (
    getSchedulesRequest: GetSchedulesRequest
  ): Promise<Response<GetSchedulesResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query Schedules ( $page: Int!, $limit:Int! ){
          schedules( page: $page, limit: $limit ) {
            id
            day
            officeMemberId
            createdAt
            updatedAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          page: getSchedulesRequest.page,
          limit: getSchedulesRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
