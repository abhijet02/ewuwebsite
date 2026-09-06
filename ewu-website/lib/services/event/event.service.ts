import { axiosClient, BASE_URL } from "@services/axiosClient";
import { Response } from "@services/response.type";
import { GetEventsRequest, GetEventsResponse } from "./event.service.type";

export const eventService = {
  getEvents: async (
    getEventsRequest: GetEventsRequest
  ): Promise<Response<GetEventsResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query Events($page: Float, $limit: Float, $pageId: Float) {
          events(page: $page, limit: $limit, pageId: $pageId) {
            id,
            pageId,
            isCopiedTo,
            category,
            title,
            slug,
            order,
            fromDate,
            toDate,
            location,
            description,
            attachmentUrl,
            attachmentName,
            eventSpeaker {
              id,
              eventId,
              name,
              designation,
              companyName,
              photoUrl,
            },
            attachments {
              id,
              eventId,
              attachmentName,
              attachmentUrl,
            },
            isMarquee,
            isPublished,
            isArchived,
            isApprovedByAdmin,
          }
        }`,
        variables: {
          page: getEventsRequest.page,
          limit: getEventsRequest.limit,
          pageId: getEventsRequest.pageId,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
