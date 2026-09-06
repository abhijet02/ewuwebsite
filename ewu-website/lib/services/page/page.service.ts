import { BASE_URL, axiosClient } from "../axiosClient";
import { Response } from "@/lib/services/response.type";
import { GetPageByLinkRequest, GetPageByLinkResponse, GetPagesRequest, GetPagesResponse } from "./page.service.type";
import { link } from "fs";

export const pageService = {
  getPages: async (
    getPageRequest: GetPagesRequest
  ): Promise<Response<GetPagesResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query Pages( $page: Float!, $limit:Float! ) {
          pages ( page: $page, limit: $limit ) {
            id,
            label,
            link,
            seoDescription,
            seoKeywords,
            isConvocationPage,
            isHomePage,
            homePageId,
            groupPageId,
            contentOf,
            facultyId,
            departmentId,
            clubId,
            officeId,
            createdAt,
            updateAt
            }
          }`,
        variables: { page: getPageRequest.page, limit: getPageRequest.limit },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

   getPageByLink: async (
    getPageRequest: GetPageByLinkRequest
  ): Promise<Response<GetPageByLinkResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query PageByLink( $link: String!) {
          pageByLink ( link: $link ) {
            id,
            label,
            link,
            seoDescription,
            seoKeywords,
            isConvocationPage,
            isHomePage,
            homePageId,
            groupPageId,
            contentOf,
            facultyId,
            departmentId,
            clubId,
            officeId,
            createdAt,
            updateAt
            }
          }`,
        variables: { link: getPageRequest.link },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
