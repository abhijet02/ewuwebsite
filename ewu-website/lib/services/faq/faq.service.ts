import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import { GetFaqRequest, GetFaqResponse } from "./faq.service.type";

export const faqService = {
  getFaqs: async (
    getFaqRequest: GetFaqRequest
  ): Promise<Response<GetFaqResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query Faqs {
          faqs {
            id,
            pageId,
            keywordId,
            title,
            answer,
            link,
            order,
            isPublished,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
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
