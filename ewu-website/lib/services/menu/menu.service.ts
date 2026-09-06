import { axiosClient, BASE_URL } from "../axiosClient";
import { Response } from "../response.type";
import { GetMenusRequest, GetMenusResponse } from "./menu.service.type";

export const menuService = {
  getMenus: async (
    getMenuRequest: GetMenusRequest
  ): Promise<Response<GetMenusResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query Menus( $page: Float!, $limit:Float! ) {
          menus ( page: $page, limit: $limit ) {
            id,
            pageId,
            label,
            link,
            parent,
            sort,
            mobileSort,
            depth,
            isMegaMenu,
            menuType,
            menuPosition,
            hasFooterMenuButton,
            }
          }`,
        variables: { page: getMenuRequest.page, limit: getMenuRequest.limit },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  getMenusWithPageIdZero: async (
    getMenuRequest: GetMenusRequest
  ): Promise<Response<GetMenusResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query MenusWithPageIdZero( $page: Float!, $limit:Float! ) {
          menusWithPageIdZero ( page: $page, limit: $limit ) {
            id,
            pageId,
            label,
            link,
            parent,
            sort,
            mobileSort,
            depth,
            isMegaMenu,
            menuType,
            menuPosition,
            hasFooterMenuButton,
            }
          }`,
        variables: { page: getMenuRequest.page, limit: getMenuRequest.limit },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
