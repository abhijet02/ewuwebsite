import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetFacultyMemberDocumentsRequest,
  GetFacultyMemberDocumentsResponse,
} from "./facultyMemberDocument.service.type";

export const facultyMemberDocumentService = {
  getFacultyMemberDocuments: async (
    getFacultyMemberDocumentsRequest: GetFacultyMemberDocumentsRequest
  ): Promise<Response<GetFacultyMemberDocumentsResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query FacultyMemberDocuments ($page: Int, $limit: Int) {
          facultyMemberDocuments (page: $page, limit: $limit) {
            id,
            facultyId,
            order,
            fileName,
            filePath,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy
          }
        }`,
        variables: {
          page: getFacultyMemberDocumentsRequest.page,
          limit: getFacultyMemberDocumentsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
