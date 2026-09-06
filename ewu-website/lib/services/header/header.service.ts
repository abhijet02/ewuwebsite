import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import { GetHeadersRequest, GetHeadersResponse } from "./header.service.type";

export const headerService = {
  getHeaders: async (
    getHeadersRequest: GetHeadersRequest
  ): Promise<Response<GetHeadersResponse>> => {
    try {
      const url = BASE_URL;

      const jsonData = {
        query: `query AllHeader(
          $page: Float!,
          $limit: Float!
        ) {
          allHeader(page: $page, limit: $limit) {
            id,
            pageId,
            headerLogoUrl,
            headerLogoLink,
            megamenuTitle,
            megaMenuBtn1Title,
            megaMenuBtn1Link,
            megaMenuBtn2Title,
            megaMenuBtn2Link,
            megaMenuBtn3Title,
            megaMenuBtn3Link,
            createdAt,
            updateAt,
            createdBy,
            updatedBy
          }
        }`,
        variables: {
          page: getHeadersRequest.page,
          limit: getHeadersRequest.limit,
        },
      };

      const response = await axiosClient.post(url, jsonData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
