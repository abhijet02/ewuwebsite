import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetSemestersRequest,
  GetSemestersResponse,
} from "./semester.service.type";

export const semesterService = {
  getSemesters: async (
    getSemestersRequest: GetSemestersRequest
  ): Promise<Response<GetSemestersResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query Semesters ( $page: Int!, $limit: Int! ) {
          semesters ( page: $page, limit: $limit ) {
            id,
            title,
            order,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          page: getSemestersRequest.page,
          limit: getSemestersRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
