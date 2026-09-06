import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetSemesterCalendersRequest,
  GetSemesterCalendersResponse,
} from "./semesterCalender.service.type";

export const semesterCalenderService = {
  getSemesterCalenders: async (
    getRequest: GetSemesterCalendersRequest
  ): Promise<Response<GetSemesterCalendersResponse>> => {
    try {
      const url = BASE_URL;

      const jsonData = {
        query: `query SemesterCalenders($page: Float!, $limit: Float!) {
          SemesterCalenders(page: $page, limit: $limit) {
            id,
            title,
            shortNote,
            label,
            order,
            description,
            attachmentUrl,
            programId,
            isBiSemester,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy
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
