import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import { GetCoursesRequest, GetCoursesResponse } from "./course.service.type";

export const courseService = {
  getCourses: async (
    getCourseRequest: GetCoursesRequest
  ): Promise<Response<GetCoursesResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query Courses( $page: Int!, $limit:Int! ) {
          getCourses ( page: $page, limit: $limit ) {
            id,
            name,
            courseCode,
            departmentId,
            programId,
            category,
            creditHour,
            order,
            preRequisite,
            description,
            }
          }`,
        variables: {
          page: getCourseRequest.page,
          limit: getCourseRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
