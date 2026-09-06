import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetOfficeMemberDocumentsRequest,
  GetOfficeMemberDocumentsResponse,
} from "./officeMemberDocument.service.type";

export const officeMemberDocumentService = {
  getOfficeMemberDocuments: async (
    getOfficeMemberDocumentsRequest: GetOfficeMemberDocumentsRequest
  ): Promise<Response<GetOfficeMemberDocumentsResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query OfficeMemberDocuments ($page: Int, $limit: Int) {
          officeMemberDocuments (page: $page, limit: $limit) {
            id,
            officeId,
            order,
            fileName,
            filePath,
            isCertificate,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy
          }
        }`,
        variables: {
          page: getOfficeMemberDocumentsRequest.page,
          limit: getOfficeMemberDocumentsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
