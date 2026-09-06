import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetAdmissionResultsRequest,
  GetAdmissionResultsResponse,
} from "./admissionResult.service.type";

export const admissionResultService = {
  getAdmissionResults: async (
    getAdmissionResultsRequest: GetAdmissionResultsRequest
  ): Promise<Response<GetAdmissionResultsResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query AdmissionResults {
          admissionResults {
            id
            programCategoryId
            semesterId
            facultyId
            year
            title
            fileUrl
            publishDate
            isArchived
            isPublished
            createdAt
            updatedAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          page: getAdmissionResultsRequest.page,
          limit: getAdmissionResultsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
