import { BASE_URL, axiosClient } from "../axiosClient";
import { Response } from "@/lib/services/response.type";
import { GetComponentRequest, GetComponentResponse } from "./component.service.type";


export const componentService = {
  getComponent: async (
    getComponentRequest: GetComponentRequest,
  ): Promise<Response<GetComponentResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query Components($page: Float!, $limit:Float!) {
          components(page: $page, limit: $limit){
              id,
              label,
              thumbnailPath,  
           }
         }`,
        variables: {
          page: getComponentRequest.page,
          limit: getComponentRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
