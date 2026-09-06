import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetStudentsSaysRequest,
  GetStudentsSaysResponse,
} from "./studentsSay.service.type";

export const studentsSayService = {
  getStudentsSays: async (
    getStudentsSayRequest: GetStudentsSaysRequest
  ): Promise<Response<GetStudentsSaysResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query AllfeedbackOfStudent ( $page: Float!, $limit: Float! ) {
          allfeedbackOfStudent ( page: $page,  limit: $limit ) {
            id,
            name,
            designation,
            description,
            year,
            pageId,
            departmentId,
            photoUrl,
            attachmentUrl,
            order,
            isPublished,
          }
        }`,
        variables: {
          page: getStudentsSayRequest.page,
          limit: getStudentsSayRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
