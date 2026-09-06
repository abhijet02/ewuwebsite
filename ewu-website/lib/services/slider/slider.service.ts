import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import { GetSlidersRequest, GetSlidersResponse } from "./slider.service.type";

export const sliderService = {
  getSliders: async (
    getSlidersRequest: GetSlidersRequest
  ): Promise<Response<GetSlidersResponse>> => {
    try {
      const url = BASE_URL;

      const jsonData = {
        query: `query Sliders(
          $page: Float!,
          $limit: Float!
        ) {
          sliders(page: $page, limit: $limit) {
            id,
            pageId,
            sliderMediaUrl,
            watermarkLogourl,
            countDownLogo,
            isPublished,
            isWatermarkEnable,
            isCountdownShow,
            countDownDate,
            countDownTime,
            countDownLabel,
            isBanner1Show,
            banner1label,
            banner1LogoLabel,
            banner1LogoUrl,
            isBanner2Show,
            banner2label,
            banner2LogoLabel,
            banner2LogoUrl,
            overlayText,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy
          }
        }`,
        variables: {
          page: getSlidersRequest.page,
          limit: getSlidersRequest.limit,
        },
      };

      const response = await axiosClient.post(url, jsonData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
