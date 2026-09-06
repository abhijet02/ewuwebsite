import {
  axiosClient,
  axiosFormDataClient,
  BASE_URL,
} from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  CreateOfficeMemberRequest,
  CreateOfficeMemberResponse,
  GetOfficeMembersRequest,
  GetOfficeMembersResponse,
  RemoveOfficeMemberRequest,
  RemoveOfficeMemberResponse,
  UpdateOfficeMemberRequest,
  UpdateOfficeMemberResponse,
} from "./officeMember.service.type";

export const officeMemberService = {
  getOfficeMembers: async (
    getOfficeMembersRequest: GetOfficeMembersRequest
  ): Promise<Response<GetOfficeMembersResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `query OfficeMembers ($page: Float!, $limit: Float!) {
          officeMembers (page: $page, limit: $limit) {
            id
            officeId
            officeIds
            name
            slug
            jobType
            designation
            designationText
            dateOfJoining
            order
            profilePhotoUrl
            cvUrl
            signatureUrl
            telephone
            ext
            location
            email
            fbLink
            xLink
            youtubeLink
            linkedInLink
            githubLink
            portfolioLink
            pinterestLink
            instagramLink
            message
            previousWorkExperience
            educationDescription
            careerDescription
            onLeaveText
            onLeave
            isPublished
            isMember
            isBoT
            isheadOfOffice
            isProctor
            isAssProctor
            isSupportMember
            isOfficeMember
            isMemberSecretary
            createdAt
            updatedAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          page: getOfficeMembersRequest.page,
          limit: getOfficeMembersRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  createOfficeMember: async (
    createOfficeMemberRequest: CreateOfficeMemberRequest
  ): Promise<Response<CreateOfficeMemberResponse>> => {
    try {
      const url: string = BASE_URL || "";
      const formData = new FormData();

      const jsonData = {
        query: `mutation CreateOfficeMemberRequest (
          $officeId: Int!,
          $officeIds: [Int!]!,
          $name: String!,
          $slug: String,
          $jobType: String,
          $designation: String!,
          $designationText: String,
          $dateOfJoining: DateTime,
          $order: Int!,
          $profilePhotoUrl: Upload,
          $signatureUrl: Upload,
          $cvUrl: Upload,
          $telephone: String,
          $ext: String,
          $location: String,
          $email: String,
          $fbLink: String,
          $xLink: String,
          $youtubeLink: String,
          $linkedInLink: String,
          $githubLink: String,
          $portfolioLink: String,
          $pinterestLink: String,
          $instagramLink: String,
          $message: String,
          $previousWorkExperience: String,
          $educationDescription: String,
          $careerDescription: String,
          $onLeaveText: String
          $onLeave: YesOrNo!
          $isPublished: YesOrNo!
          $isMember: YesOrNo!
          $isBoT: YesOrNo!
          $isOfficeMember: YesOrNo!
          $isheadOfOffice: YesOrNo,
          $isProctor: YesOrNo,
          $isAssProctor: YesOrNo,
          $isSupportMember: YesOrNo!,
          $isMemberSecretary: YesOrNo!
        ) {
          createOfficeMemberRequest (
            createOfficeMemberRequestInput: {
              officeId: $officeId,
              officeIds: $officeIds,
              name: $name,
              slug: $slug,
              jobType: $jobType,
              designation: $designation,
              designationText: $designationText,
              dateOfJoining: $dateOfJoining,
              order: $order,
              profilePhotoUrl: $profilePhotoUrl,
              signatureUrl: $signatureUrl,
              cvUrl: $cvUrl,
              telephone: $telephone,
              ext: $ext,
              location: $location,
              email: $email,
              fbLink: $fbLink,
              xLink: $xLink,
              youtubeLink: $youtubeLink,
              linkedInLink: $linkedInLink,
              githubLink: $githubLink,
              portfolioLink: $portfolioLink,
              pinterestLink: $pinterestLink,
              instagramLink: $instagramLink,
              message: $message,
              previousWorkExperience: $previousWorkExperience,
              educationDescription: $educationDescription,
              careerDescription: $careerDescription,
              onLeaveText: $onLeaveText
              onLeave: $onLeave
              isPublished: $isPublished
              isMember: $isMember
              isBoT: $isBoT
              isOfficeMember: $isOfficeMember
              isheadOfOffice: $isheadOfOffice,
              isProctor: $isProctor,
              isAssProctor: $isAssProctor,
              isSupportMember: $isSupportMember,
              isMemberSecretary: $isMemberSecretary
            }
          ) {
            id
            officeId
            officeIds
            name
            slug
            jobType
            designation
            designationText
            dateOfJoining
            order
            profilePhotoUrl
            cvUrl
            signatureUrl
            telephone
            ext
            location
            email
            fbLink
            xLink
            youtubeLink
            linkedInLink
            githubLink
            portfolioLink
            pinterestLink
            instagramLink
            message
            previousWorkExperience
            educationDescription
            careerDescription
            onLeaveText
            onLeave
            isPublished
            isheadOfOffice
            isMember
            isBoT
            isOfficeMember
            isProctor
            isAssProctor
            isSupportMember
            isMemberSecretary
            createdAt
            updatedAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          officeId: Number(createOfficeMemberRequest.officeId),
          officeIds: createOfficeMemberRequest.officeIds,
          name: createOfficeMemberRequest.name,
          slug: createOfficeMemberRequest.slug,
          jobType: createOfficeMemberRequest.jobType,
          designation: createOfficeMemberRequest.designation,
          designationText: createOfficeMemberRequest.designationText,
          dateOfJoining: createOfficeMemberRequest.dateOfJoining,
          order: Number(createOfficeMemberRequest.order),
          telephone: createOfficeMemberRequest.telephone,
          ext: createOfficeMemberRequest.ext,
          location: createOfficeMemberRequest.location,
          email: createOfficeMemberRequest.email,
          fbLink: createOfficeMemberRequest.fbLink,
          xLink: createOfficeMemberRequest.xLink,
          youtubeLink: createOfficeMemberRequest.youtubeLink,
          linkedInLink: createOfficeMemberRequest.linkedInLink,
          githubLink: createOfficeMemberRequest.githubLink,
          portfolioLink: createOfficeMemberRequest.portfolioLink,
          pinterestLink: createOfficeMemberRequest.pinterestLink,
          instagramLink: createOfficeMemberRequest.instagramLink,
          message: createOfficeMemberRequest.message,
          previousWorkExperience:
            createOfficeMemberRequest.previousWorkExperience,
          educationDescription: createOfficeMemberRequest.educationDescription,
          careerDescription: createOfficeMemberRequest.careerDescription,
          onLeaveText: createOfficeMemberRequest.onLeaveText,
          onLeave: createOfficeMemberRequest.onLeave,
          isPublished: createOfficeMemberRequest.isPublished,
          isMember: createOfficeMemberRequest.isMember,
          isBoT: createOfficeMemberRequest.isBoT,
          isheadOfOffice: createOfficeMemberRequest.isheadOfOffice,
          isProctor: createOfficeMemberRequest.isProctor,
          isAssProctor: createOfficeMemberRequest.isAssProctor,
          isSupportMember: createOfficeMemberRequest.isSupportMember,
          isOfficeMember: createOfficeMemberRequest.isOfficeMember,
          isMemberSecretary: createOfficeMemberRequest.isMemberSecretary,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      const fileMap: Record<string, string[]> = {};
      let fileIndex = 0;

      if (createOfficeMemberRequest.profilePhotoUrl) {
        fileMap[`${fileIndex}`] = ["variables.profilePhotoUrl"];
        fileIndex++;
      }

      if (createOfficeMemberRequest.signatureUrl) {
        fileMap[`${fileIndex}`] = ["variables.signatureUrl"];
        fileIndex++;
      }

      if (createOfficeMemberRequest.cvUrl) {
        fileMap[`${fileIndex}`] = ["variables.cvUrl"];
        fileIndex++;
      }

      formData.append("map", JSON.stringify(fileMap));

      fileIndex = 0;

      if (createOfficeMemberRequest.profilePhotoUrl) {
        formData.append(
          `${fileIndex}`,
          createOfficeMemberRequest.profilePhotoUrl
        );
        fileIndex++;
      }

      if (createOfficeMemberRequest.signatureUrl) {
        formData.append(`${fileIndex}`, createOfficeMemberRequest.signatureUrl);
        fileIndex++;
      }

      if (createOfficeMemberRequest.cvUrl) {
        formData.append(`${fileIndex}`, createOfficeMemberRequest.cvUrl);
        fileIndex++;
      }

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  updateOfficeMember: async (
    updateOfficeMemberRequest: UpdateOfficeMemberRequest
  ): Promise<Response<UpdateOfficeMemberResponse>> => {
    try {
      const url: string = BASE_URL || "";
      const formData = new FormData();

      const jsonData = {
        query: `mutation UpdateOfficeMember (
          $id: Int!,
          $officeId: Int!,
          $officeIds: [Int!]!,
          $name: String!,
          $slug: String,
          $jobType: String,
          $designation: String!,
          $designationText: String,
          $dateOfJoining: DateTime,
          $order: Int!,
          $profilePhotoUrl: Upload,
          $signatureUrl: Upload,
          $cvUrl: Upload,
          $telephone: String,
          $ext: String,
          $location: String,
          $email: String,
          $fbLink: String,
          $xLink: String,
          $youtubeLink: String,
          $linkedInLink: String,
          $githubLink: String,
          $portfolioLink: String,
          $pinterestLink: String,
          $instagramLink: String,
          $message: String,
          $previousWorkExperience: String,
          $educationDescription: String,
          $careerDescription: String,
          $onLeaveText: String
          $onLeave: YesOrNo!
          $isPublished: YesOrNo!
          $isMember: YesOrNo!
          $isBoT: YesOrNo!
          $isheadOfOffice: YesOrNo,
          $isProctor: YesOrNo,
          $isAssProctor: YesOrNo,
          $isSupportMember: YesOrNo,
          $isOfficeMember: YesOrNo!
          $isMemberSecretary: YesOrNo
        ) {
          updateOfficeMember (
            updateOfficeMemberInput: {
              id: $id,
              officeId: $officeId,
              officeIds: $officeIds,
              name: $name,
              slug: $slug,
              jobType: $jobType,
              designation: $designation,
              designationText: $designationText,
              dateOfJoining: $dateOfJoining,
              order: $order,
              profilePhotoUrl: $profilePhotoUrl,
              signatureUrl: $signatureUrl,
              cvUrl: $cvUrl,
              telephone: $telephone,
              ext: $ext,
              location: $location,
              email: $email,
              fbLink: $fbLink,
              xLink: $xLink,
              youtubeLink: $youtubeLink,
              linkedInLink: $linkedInLink,
              githubLink: $githubLink,
              portfolioLink: $portfolioLink,
              pinterestLink: $pinterestLink,
              instagramLink: $instagramLink,
              message: $message,
              previousWorkExperience: $previousWorkExperience,
              educationDescription: $educationDescription,
              careerDescription: $careerDescription,
              onLeaveText: $onLeaveText,
              onLeave: $onLeave,
              isPublished: $isPublished,
              isBoT: $isBoT,
              isheadOfOffice: $isheadOfOffice,
              isProctor: $isProctor,
              isAssProctor: $isAssProctor,
              isSupportMember: $isSupportMember,
              isOfficeMember: $isOfficeMember,
              isMember: $isMember,
              isMemberSecretary: $isMemberSecretary,
            }
          ) {
            id
            officeId
            officeIds
            name
            slug
            jobType
            designation
            designationText
            dateOfJoining
            order
            profilePhotoUrl
            signatureUrl
            cvUrl
            telephone
            ext
            location
            email
            fbLink
            xLink
            youtubeLink
            linkedInLink
            githubLink
            portfolioLink
            pinterestLink
            instagramLink
            message
            previousWorkExperience
            educationDescription
            careerDescription
            onLeaveText
            onLeave
            isPublished
            isMember
            isBoT
            isheadOfOffice
            isProctor
            isAssProctor
            isSupportMember
            isOfficeMember
            isMemberSecretary
            createdAt
            updatedAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          id: updateOfficeMemberRequest.id,
          officeId: Number(updateOfficeMemberRequest.officeId),
          officeIds: updateOfficeMemberRequest.officeIds,
          name: updateOfficeMemberRequest.name,
          slug: updateOfficeMemberRequest.slug,
          jobType: updateOfficeMemberRequest.jobType,
          designation: updateOfficeMemberRequest.designation,
          designationText: updateOfficeMemberRequest.designationText,
          dateOfJoining: updateOfficeMemberRequest.dateOfJoining,
          order: Number(updateOfficeMemberRequest.order),
          telephone: updateOfficeMemberRequest.telephone,
          ext: updateOfficeMemberRequest.ext,
          location: updateOfficeMemberRequest.location,
          email: updateOfficeMemberRequest.email,
          fbLink: updateOfficeMemberRequest.fbLink,
          xLink: updateOfficeMemberRequest.xLink,
          youtubeLink: updateOfficeMemberRequest.youtubeLink,
          linkedInLink: updateOfficeMemberRequest.linkedInLink,
          githubLink: updateOfficeMemberRequest.githubLink,
          portfolioLink: updateOfficeMemberRequest.portfolioLink,
          pinterestLink: updateOfficeMemberRequest.pinterestLink,
          instagramLink: updateOfficeMemberRequest.instagramLink,
          message: updateOfficeMemberRequest.message,
          previousWorkExperience:
            updateOfficeMemberRequest.previousWorkExperience,
          educationDescription: updateOfficeMemberRequest.educationDescription,
          careerDescription: updateOfficeMemberRequest.careerDescription,
          onLeaveText: updateOfficeMemberRequest.onLeaveText,
          onLeave: updateOfficeMemberRequest.onLeave,
          isPublished: updateOfficeMemberRequest.isPublished,
          isMember: updateOfficeMemberRequest.isMember,
          isBoT: updateOfficeMemberRequest.isBoT,
          isheadOfOffice: updateOfficeMemberRequest.isheadOfOffice,
          isProctor: updateOfficeMemberRequest.isProctor,
          isAssProctor: updateOfficeMemberRequest.isAssProctor,
          isSupportMember: updateOfficeMemberRequest.isSupportMember,
          isOfficeMember: updateOfficeMemberRequest.isOfficeMember,
          isMemberSecretary: updateOfficeMemberRequest.isMemberSecretary,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      const fileMap: Record<string, string[]> = {};
      let fileIndex = 0;

      if (updateOfficeMemberRequest.profilePhotoUrl) {
        fileMap[`${fileIndex}`] = ["variables.profilePhotoUrl"];
        fileIndex++;
      }

      if (updateOfficeMemberRequest.signatureUrl) {
        fileMap[`${fileIndex}`] = ["variables.signatureUrl"];
        fileIndex++;
      }

      if (updateOfficeMemberRequest.cvUrl) {
        fileMap[`${fileIndex}`] = ["variables.cvUrl"];
        fileIndex++;
      }

      formData.append("map", JSON.stringify(fileMap));

      fileIndex = 0;

      if (updateOfficeMemberRequest.profilePhotoUrl) {
        formData.append(
          `${fileIndex}`,
          updateOfficeMemberRequest.profilePhotoUrl
        );
        fileIndex++;
      }

      if (updateOfficeMemberRequest.signatureUrl) {
        formData.append(`${fileIndex}`, updateOfficeMemberRequest.signatureUrl);
        fileIndex++;
      }

      if (updateOfficeMemberRequest.cvUrl) {
        formData.append(`${fileIndex}`, updateOfficeMemberRequest.cvUrl);
        fileIndex++;
      }

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  removeOfficeMember: async (
    removeOfficeMemberRequest: RemoveOfficeMemberRequest
  ): Promise<Response<RemoveOfficeMemberResponse>> => {
    try {
      const url: string = BASE_URL || "";

      const jsonData = {
        query: `mutation RemoveOfficeMember ( $id: Int! ) {
          removeOfficeMember ( id: $id ) {
            id
            officeId
            officeIds
            name
            slug
            jobType
            designation
            designationText
            dateOfJoining
            order
            telephone
            ext
            location
            email
            fbLink
            xLink
            youtubeLink
            linkedInLink
            githubLink
            portfolioLink
            pinterestLink
            instagramLink
            message
            previousWorkExperience
            educationDescription
            careerDescription
            onLeaveText
            onLeave
            isPublished
            isMember
            isBoT
            isheadOfOffice
            isProctor
            isAssProctor
            isSupportMember
            isOfficeMember
            isMemberSecretary
            createdAt
            updatedAt
            createdBy
            updatedBy
          }
        }`,
        variables: {
          id: removeOfficeMemberRequest.id,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
