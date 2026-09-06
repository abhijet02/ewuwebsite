import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import { GetFootersRequest, GetFootersResponse } from "./footer.service.type";

export const footerService = {
  getFooters: async (
    getFootersRequest: GetFootersRequest
  ): Promise<Response<GetFootersResponse>> => {
    try {
      const url = BASE_URL;

      const jsonData = {
        query: `query AllFooter ( $page: Float!, $limit: Float! ) {
          allFooter ( page: $page, limit: $limit ) {
            id,
            pageId,
            headerText,
            footerApplyNowText,
            footerApplyNowLink,
            footerLogoUrl,
            footerMediaUrl,
            footerContactUsMobile,
            footerContactUsEmail,
            footerContactUsHotline,
            footerAddress,
            footerMapPath,
            footerMap,
            footerCopyRightTitle,
            createdAt,
            updateAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          page: getFootersRequest.page,
          limit: getFootersRequest.limit,
        },
      };

      const response = await axiosClient.post(url, jsonData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
