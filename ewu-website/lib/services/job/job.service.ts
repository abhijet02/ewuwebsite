import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import { GetJobsRequest, GetJobsResponse } from "./job.service.type";

export const jobService = {
  getJobs: async (
    getJobsRequest: GetJobsRequest
  ): Promise<Response<GetJobsResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query Jobs ( $page: Int!, $limit:Int! ){
          jobs( page: $page, limit: $limit ) {
            id
            pageId
            order
            slug
            title
            designation
            ageLimit
            ageLimitDate
            officeId
            departmentId
            facultyId
            date
            deadline
            numberOfVacancy
            jobDescription
            jobCircularUrl
            jobtype
            fbLink
            xLink
            inLink
            email
            exeperience
            education
            isPublished
            isApplyNowShow
            createdAt
            updatedAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          page: getJobsRequest.page,
          limit: getJobsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
