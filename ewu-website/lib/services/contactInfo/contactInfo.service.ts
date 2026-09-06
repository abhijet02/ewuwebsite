import { axiosClient, BASE_URL } from "@/lib/services/axiosClient";
import { Response } from "@/lib/services/response.type";
import {
  GetContactInfoRequest,
  GetContactInfoResponse,
} from "./contactInfo.service.type";

export const contactInfoService = {
  getContactInfo: async (
    getContactInfoRequest: GetContactInfoRequest
  ): Promise<Response<GetContactInfoResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query FindAll {
          findAll {
            id,
            pageId,
            address,
            primaryEmail,
            secondaryEmail,
            primaryPhone,
            officePhone,
            primaryHotline,
            secondaryHotline,
            link,
            contents {
              id,
              text,
              header,
              link
            },
            media {
              id,
              contactInfoId,
              url,
            },
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          // page: getContactInfoRequest.page,
          // limit: 100000,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
