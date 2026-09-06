import { axiosClient, BASE_URL } from "@/lib/services/axiosClient";
import { Response } from "../response.type";
import {
  GetDepartmentsRequest,
  GetDepartmentsResponse,
} from "./department.service.type";

export const departmentService = {
  getDepartments: async (
    getDepartmentRequest: GetDepartmentsRequest
  ): Promise<Response<GetDepartmentsResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query GetDepartments  {
          getDepartments  {
            id,
            slug,
            name,
            description,
            mission,
            vision,
            order,
            facultyId,
            photoUrl,
            isSubDepartment
            }
          }`,
        variables: {
          page: getDepartmentRequest.page,
          limit: getDepartmentRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
