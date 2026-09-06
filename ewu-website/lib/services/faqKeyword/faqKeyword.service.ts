import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetFaqKeywordRequest,
  GetFaqKeywordResponse,
} from "./faqKeyword.service.type";

export const faqKeywordService = {
  getFaqKeyword: async (
    getFaqRequest: GetFaqKeywordRequest
  ): Promise<Response<GetFaqKeywordResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query Faqkeywords {
                  faqkeywords {
                      id
                      label
                      createdAt
                      updatedAt
                      createdBy
                      updatedBy
                  }
              }`,
        variables: {
          page: getFaqRequest.page,
          limit: getFaqRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
