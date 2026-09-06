import { axiosClient, BASE_URL } from "@/lib/services/axiosClient";
import { Response } from "../response.type";
import {
  GetFacultysRequest,
  GetFacultysResponse,
} from "./faculty.service.type";

export const facultyService = {
  getFacultys: async (
    getFacultyRequest: GetFacultysRequest
  ): Promise<Response<GetFacultysResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query Faculties ( $page: Float!, $limit:Float! ) {
          faculties ( page: $page, limit: $limit ) {
            id,
            slug,
            name,
            description,
            order,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
            }
          }`,
        variables: {
          page: getFacultyRequest.page,
          limit: getFacultyRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
