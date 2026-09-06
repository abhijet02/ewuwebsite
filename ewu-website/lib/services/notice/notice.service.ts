import { axiosClient, BASE_URL } from "@/lib/services/axiosClient";
import { Response } from "../response.type";
import { GetNoticesRequest, GetNoticesResponse } from "./notice.service.type";

export const noticeService = {
  getNotices: async (
    getNoticesRequest: GetNoticesRequest
  ): Promise<Response<GetNoticesResponse>> => {
    try {
      const url: string = BASE_URL!;

      const jsonData = {
        query: `query GetAllNotices ( $page: Float, $limit: Float, $pageId: Float ) {
          getAllNotices ( page: $page, limit: $limit, pageId: $pageId ) {
            id,
            category,
            sub_category,
            pageId,
            isCopiedTo,
            label,
            description,
            date,
            location,
            author,
            attachmentUrl,
            thumbnail,
            photos {
              id,
              noticeId,
              url,
              createdAt,
              updateAt,
            },
            slug,
            order,
            isMarquee,
            isPublished,
            isArchived,
            isApprovedByAdmin,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          page: getNoticesRequest.page,
          limit: getNoticesRequest.limit,
          pageId: getNoticesRequest.pageId,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
