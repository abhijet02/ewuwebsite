import {
  axiosClient,
  axiosFormDataClient,
  BASE_URL,
} from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetAboutOrgsRequest,
  GetAboutOrgsResponse,
  Publish,
} from "./aboutOrg.service.type";

export const aboutOrgService = {
  getAboutOrgs: async (
    getAboutOrgRequest: GetAboutOrgsRequest
  ): Promise<Response<GetAboutOrgsResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query AboutOrgs {
          aboutOrgs {
            id
            sectionTitle
            sectionSubTitle
            aboutUstitle
            aboutUs
            missionTitle
            mission
            visionTitle
            vision
            mediaUrl
            isPublished
            createdAt
            updateAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          page: getAboutOrgRequest.page,
          limit: getAboutOrgRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
