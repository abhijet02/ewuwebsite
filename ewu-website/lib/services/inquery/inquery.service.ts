import {
  axiosClient,
  axiosFormDataClient,
  BASE_URL,
} from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetInquerysRequest,
  GetInquerysResponse,
  CreateInqueryRequest,
  Inquery,
  UpdateInqueryRequest,
  RemoveInqueryRequest,
} from "./inquery.service.type";

export const inqueryService = {
  getInquerys: async (
    getInquerysRequest: GetInquerysRequest,
  ): Promise<Response<GetInquerysResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query AllInquery ( $page: Float!, $limit:Float! ) {
            allInquery (page: $page, limit: $limit) {
                id
                fullName
                studentId
                phoneNumber
                studentEmail
                email
                subject
                message
                attachmentUrl
                createdAt
                updatedAt
            }
          }`,
        variables: {
          page: getInquerysRequest.page,
          limit: getInquerysRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  createInquery: async (
    createInqueryRequest: CreateInqueryRequest,
  ): Promise<Response<Event>> => {
    try {
      const url: string = BASE_URL;
      const formData = new FormData();

      const jsonData = {
        query: `mutation CreateInquery (
            $fullName: String!
            $studentId: String
            $phoneNumber: String!
            $studentEmail: String
            $email: String!
            $subject: String
            $message: String
            $attachmentUrl: Upload
        ) {
          createInquery (
            createInqueryInput: {
              fullName: $fullName
              studentId: $studentId
              phoneNumber: $phoneNumber
              studentEmail: $studentEmail
              email: $email
              subject: $subject
              message: $message
              attachmentUrl: $attachmentUrl
            }
          ) {
            id
            fullName
            studentId
            phoneNumber
            studentEmail
            email
            subject
            message
            attachmentUrl
            createdAt
            updatedAt
          }
        }`,
        variables: {
          fullName: createInqueryRequest.fullName,
          studentId: createInqueryRequest.studentId,
          phoneNumber: createInqueryRequest.phoneNumber.toString(),
          studentEmail: createInqueryRequest.studentEmail,
          email: createInqueryRequest.email,
          subject: createInqueryRequest.subject,
          message: createInqueryRequest.message,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      if (createInqueryRequest.attachmentUrl) {
        formData.append("map", '{ "0": ["variables.attachmentUrl"] }');
        formData.append("0", createInqueryRequest.attachmentUrl);
      } else {
        formData.append("map", "{}");
      }

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  updateInquery: async (
    updateInqueryRequest: UpdateInqueryRequest,
  ): Promise<Response<Inquery>> => {
    try {
      const url: string = BASE_URL;
      const formData = new FormData();

      const jsonData = {
        query: `mutation UpdateInquery (
            $id: Int!, 
            $fullName: String!
            $studentId: String
            $phoneNumber: String!
            $studentEmail: String
            $email: String!
            $subject: String
            $message: String
            $attachmentUrl: Upload

          ) {
            updateInquery (
              updateInqueryInput: {
                id: $id,
                fullName: $fullName
                studentId: $studentId
                phoneNumber: $phoneNumber
                studentEmail: $studentEmail
                email: $email
                subject: $subject
                message: $message
                attachmentUrl: $attachmentUrl  
              }
            ) {
                id
                fullName
                studentId
                phoneNumber
                studentEmail
                email
                subject
                message
                attachmentUrl
                createdAt
                updatedAt
            }
          }`,
        variables: {
          id: updateInqueryRequest.id,
          fullName: updateInqueryRequest.fullName,
          studentId: updateInqueryRequest.studentId,
          phoneNumber: updateInqueryRequest.phoneNumber,
          studentEmail: updateInqueryRequest.studentEmail,
          email: updateInqueryRequest.email,
          subject: updateInqueryRequest.subject,
          message: updateInqueryRequest.message,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      if (updateInqueryRequest?.attachmentUrl) {
        formData.append("map", '{ "0": ["variables.attachmentUrl"] }');
        formData.append("0", updateInqueryRequest.attachmentUrl);
      } else {
        formData.append("map", "{}");
      }

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  removeInquery: async (
    removeInqueryRequest: RemoveInqueryRequest,
  ): Promise<Response<Inquery>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation RemoveInquery ( $id: Float! ) {
            removeInquery ( id: $id ) {
                id
                fullName
                studentId
                phoneNumber
                studentEmail
                email
                subject
                message
                attachmentUrl
                createdAt
                updatedAt
            }
          }`,
        variables: {
          id: removeInqueryRequest.id,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
