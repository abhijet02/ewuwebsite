import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  CalenderDate,
  GetCalenderDatesRequest,
} from "./calenderDate.service.type";

export const calenderDateService = {
  getCalenderDates: async (
    getCalenderDatesRequest: GetCalenderDatesRequest
  ): Promise<Response<CalenderDate[]>> => {
    try {
      const url = BASE_URL;

      const jsonData = {
        query: `query CalenderDates($page: Float!, $limit: Float!) {
          calenderDates(page: $page, limit: $limit) {
            id,
            date,
            dateText,
            endDate,
            endDateText,
            day,
            event,
            description,
            semesterId,
            programId,
            isImportantDate,
            classDays,
            lastDateOfClass,
            lastDateOfClassText,
            finalExamDays,
            finalExamDate,
            finalExamDateText,
            order,
            isPublished,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          page: getCalenderDatesRequest.page,
          limit: getCalenderDatesRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
