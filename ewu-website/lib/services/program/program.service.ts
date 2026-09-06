import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetProgramsRequest,
  GetProgramsResponse,
} from "./program.service.type";

export const programService = {
  getPrograms: async (
    getProgramRequest: GetProgramsRequest
  ): Promise<Response<GetProgramsResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query Programs( $page: Float!, $limit: Float! ) {
          programs( page: $page, limit: $limit ) {
            id,
            title,
            programCategoryId,
            semester,
            facultyId,
            departmentId,
            order,
            programDetails,
            admissionDeadline,
            admissionDeadlineText,
            credit,
            tutionfeePerCredit,
            tutionfeeTotal,
            labFee,
            dateOfaddissionTest,
            dateOfadmissionTestText,
            admissionFee,
            termsAndCondition,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          page: getProgramRequest.page,
          limit: getProgramRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
