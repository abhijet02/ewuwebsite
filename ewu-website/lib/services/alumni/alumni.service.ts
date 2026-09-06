import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import { GetAlumniRequest, GetAlumniResponse } from "./alumni.service.type";

export const alumniService = {
  getAlumni: async (
    getAlumniRequest: GetAlumniRequest
  ): Promise<Response<GetAlumniResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query NoteableAlumni ( $page: Int!, $limit: Int! ) {
            noteableAlumni ( page: $page, limit: $limit ) {
              id,
              departmentId,
              photoUrl,
              name,
              graduationYear,
              programName,
              organization,
              designation,
              description,
            }
          }`,
        variables: {
          page: getAlumniRequest.page,
          limit: getAlumniRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
