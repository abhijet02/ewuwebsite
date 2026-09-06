import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetWhyChoosesRequest,
  GetWhyChoosesResponse,
} from "./whyChoose.service.type";

export const whyChooseService = {
  getWhyChooses: async (
    getWhyChoosesRequest: GetWhyChoosesRequest
  ): Promise<Response<GetWhyChoosesResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query WhyChooseDepartments($page: Int!, $limit: Int!) {
          whyChooseDepartments(page: $page, limit: $limit) {
            id
            label
            order
            departmentId
            photoUrl
          }
        }`,
        variables: {
          page: getWhyChoosesRequest.page,
          limit: getWhyChoosesRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
