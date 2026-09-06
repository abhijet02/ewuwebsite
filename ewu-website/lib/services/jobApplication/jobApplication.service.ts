import {
  axiosClient,
  axiosFormDataClient,
  BASE_URL,
} from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetJobApplicationsRequest,
  GetJobApplicationsResponse,
  CreateJobApplicationRequest,
  JobApplication,
  UpdateJobApplicationRequest,
  RemoveJobApplicationRequest,
} from "./jobApplication.service.type";

export const jobApplicationService = {
  getjobAplications: async (
    getJobApplicationsRequest: GetJobApplicationsRequest
  ): Promise<Response<GetJobApplicationsResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query JobApplications ( $page: Float!, $limit:Float! ) {
            jobApllications (page: $page, limit: $limit) {
                id
                jobId
                name
                designation
                email
                phone
                dob
                address
                coverLetter
                cvUrl
                coverLetterUrl
                attachmentUrl
                photoUrl
                isPublished
                isChecked
                createdAt
                updatedAt
            }
          }`,
        variables: {
          page: getJobApplicationsRequest.page,
          limit: getJobApplicationsRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  createJobApplication: async (
    createJobApplicationRequest: CreateJobApplicationRequest
  ): Promise<Response<Event>> => {
    try {
      const url: string = BASE_URL;
      const formData = new FormData();

      const jsonData = {
        query: `mutation CreateInquery (
            $jobId: Int!
            $name: String!
            $designation: String
            $email: String!
            $phone: String!
            $dob: DateTime
            $address: String
            $coverLetter: String
            $cvUrl: Upload
            $coverLetterUrl: Upload
            $attachmentUrl: Upload
            $photoUrl: Upload
            $isPublished: Publish!
            $isChecked: YesOrNo
        ) {
          createJobApplication (
            createJobApplicationInput: {
              jobId: $jobId
              name: $name
              designation: $designation
              email: $email
              phone: $phone
              dob: $dob
              address: $address
              coverLetter: $coverLetter
              cvUrl: $cvUrl
              coverLetterUrl: $coverLetterUrl
              attachmentUrl: $attachmentUrl
              photoUrl: $photoUrl
              isPublished: $isPublished
              isChecked: $isChecked
            }
          ) {
            id
            jobId
            name
            designation
            email
            phone
            dob
            address
            coverLetter
            cvUrl
            coverLetterUrl
            attachmentUrl
            photoUrl
            isPublished
            isChecked
            createdAt
            updatedAt
          }
        }`,
        variables: {
          jobId: parseInt(createJobApplicationRequest.jobId.toString()),
          name: createJobApplicationRequest.name,
          designation: createJobApplicationRequest.designation,
          email: createJobApplicationRequest.email,
          phone: createJobApplicationRequest.phone,
          dob: createJobApplicationRequest.dob,
          address: createJobApplicationRequest.address,
          coverLetter: createJobApplicationRequest.coverLetter,
          cvUrl: createJobApplicationRequest.cvUrl,
          coverLetterUrl: createJobApplicationRequest.coverLetterUrl,
          attachmentUrl: createJobApplicationRequest.attachmentUrl,
          photoUrl: createJobApplicationRequest.photoUrl,
          isPublished: createJobApplicationRequest.isPublished,
          isChecked: createJobApplicationRequest.isChecked,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      // Build file map
      const fileMap: Record<string, string[]> = {};
      let fileIndex = 0;

      const fileFields: [keyof CreateJobApplicationRequest, string][] = [
        ["cvUrl", "variables.cvUrl"],
        ["coverLetterUrl", "variables.coverLetterUrl"],
        ["attachmentUrl", "variables.attachmentUrl"],
        ["photoUrl", "variables.photoUrl"],
      ];

      fileFields.forEach(([field, variablePath]) => {
        const file = createJobApplicationRequest[field];
        if (file) {
          const index = fileIndex.toString();
          fileMap[index] = [variablePath];
          fileIndex++;
        }
      });

      // Append map
      formData.append("map", JSON.stringify(fileMap));

      // Append files
      fileIndex = 0;
      fileFields.forEach(([field]) => {
        const file = createJobApplicationRequest[field];
        if (file) {
          formData.append(fileIndex.toString(), file as File);
          fileIndex++;
        }
      });

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  updateJobApplication: async (
    updateJobApplicationRequest: UpdateJobApplicationRequest
  ): Promise<Response<JobApplication>> => {
    try {
      const url: string = BASE_URL;
      const formData = new FormData();

      const jsonData = {
        query: `mutation UpdateJobApplication (
            $id: Int!, 
            $jobId: Int!
            $name: String!
            $email: String!
            $phone: String!
            $dob: DateTime
            $address: String
            $coverLetter: String
            $cvUrl: Upload
            $coverLetterUrl: Upload
            $isPublished: Publish!
            $isChecked: YesOrNo

          ) {
            updateJobApplication (
              updateJobApplicationInput: {
                id: $id,
                jobId: $jobId
                name: $name
                email: $email
                phone: $phone
                dob: $dob
                address: $address
                coverLetter: $coverLetter
                cvUrl: $cvUrl
                coverLetterUrl: $coverLetterUrl
                isPublished: $isPublished
                isChecked: $isChecked
              }
            ) {
              id
              jobId
              name
              email
              phone
              dob
              address
              coverLetter
              cvUrl
              coverLetterUrl
              isPublished
              isChecked
              createdAt
              updatedAt
            }
          }`,
        variables: {
          id: updateJobApplicationRequest.id,
          jobId: updateJobApplicationRequest.jobId,
          name: updateJobApplicationRequest.name,
          email: updateJobApplicationRequest.email,
          phone: updateJobApplicationRequest.phone,
          dob: updateJobApplicationRequest.dob,
          address: updateJobApplicationRequest.address,
          coverLetter: updateJobApplicationRequest.coverLetter,
          cvUrl: updateJobApplicationRequest.cvUrl,
          isPublished: updateJobApplicationRequest.isPublished,
          isChecked: updateJobApplicationRequest.isChecked,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      // Build fileMap
      const fileMap: any = {};
      let fileIndex = 0;
      const filesToAppend: [string, File][] = [];

      const fileFields: [keyof CreateJobApplicationRequest, string][] = [
        ["cvUrl", "variables.cvUrl"],
        ["coverLetterUrl", "variables.coverLetterUrl"],
        ["attachmentUrl", "variables.attachmentUrl"],
        ["photoUrl", "variables.photoUrl"],
      ];

      fileFields.forEach(([field, variablePath]) => {
        const file = updateJobApplicationRequest[field];
        if (file) {
          const index = fileIndex.toString();
          fileMap[index] = [variablePath];
          filesToAppend.push([index, file as File]);
          fileIndex++;
        }
      });

      // Append map
      formData.append("map", JSON.stringify(fileMap));

      // Append files
      filesToAppend.forEach(([index, file]) => {
        formData.append(index, file);
      });

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  removeJobApplication: async (
    removeJobApplicationRequest: RemoveJobApplicationRequest
  ): Promise<Response<JobApplication>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation RemoveApplication ( $id: Int! ) {
            removeApplication ( id: $id ) {
                id
                jobId
                name
                designation
                email
                phone
                dob
                address
                coverLetter
                cvUrl
                coverLetterUrl
                attachmentUrl
                photoUrl
                isPublished
                isChecked
                createdAt
                updatedAt
            }
          }`,
        variables: {
          id: removeJobApplicationRequest.id,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
