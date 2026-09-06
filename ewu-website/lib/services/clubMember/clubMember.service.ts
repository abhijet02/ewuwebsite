import {
  axiosClient,
  axiosFormDataClient,
  BASE_URL,
} from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetClubMembersRequest,
  GetClubMembersResponse,
  CreateClubMemberRequest,
  ClubMember,
  UpdateClubMemberRequest,
  RemoveClubMemberRequest,
} from "./clubMember.service.type";

export const clubMemberService = {
  getClubMembers: async (
    getClubMembersRequest: GetClubMembersRequest
  ): Promise<Response<GetClubMembersResponse>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `query ClubMembers ( $page: Int!, $limit: Int! ) {
          clubMembers ( page: $page, limit: $limit ) {
            id,
            slug,
            fullName,
            studentId,
            clubId,
            designation,
            photoUrl,
            cvUrl,
            signatureUrl,
            youtubeLink,
            email,
            phoneNumber,
            earnedCredit,
            semester,
            joiningSemeser,
            cgpa,
            bloodGroup,
            skillId,
            achievements,
            hobby,
            classRoutine,
            isApproved,
            isExecutive,
            isModerators,
            startdate,
            endDate,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          page: getClubMembersRequest.page,
          limit: getClubMembersRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  createClubMember: async (
    createClubMemberRequest: CreateClubMemberRequest
  ): Promise<Response<ClubMember>> => {
    try {
      const url: string = BASE_URL;
      const formData = new FormData();

      const jsonData = {
        query: `mutation CreateClubMember (
            $slug: String,
            $fullName: String!,
            $studentId: String,
            $clubId: Int!,
            $designation: String,
            $photoUrl: Upload,
            $cvUrl: Upload,
            $signatureUrl: Upload,
            $youtubeLink: String,
            $email: String,
            $phoneNumber: String,
            $earnedCredit: String,
            $semester: String,
            $joiningSemeser: String,
            $cgpa: String,
            $bloodGroup: String,
            $skillId: [Int!]!,
            $achievements: String,
            $hobby: String,
            $classRoutine: String,
            $isApproved: YesOrNo,
            $isExecutive: YesOrNo,
            $isModerators: YesOrNo,
            $startdate: DateTime,
            $endDate: DateTime
        ) {
          createClubMember (
            createClubMemberInput: {
              slug: $slug,
              fullName: $fullName,
              studentId: $studentId,
              clubId: $clubId,
              designation: $designation,
              isExecutive: $isExecutive,
              isModerators: $isModerators,
              startdate: $startdate,
              endDate: $endDate,
              photoUrl: $photoUrl,
              cvUrl: $cvUrl,
              signatureUrl: $signatureUrl,
              youtubeLink: $youtubeLink,
              email: $email,
              phoneNumber: $phoneNumber,
              earnedCredit: $earnedCredit,
              semester: $semester,
              joiningSemeser: $joiningSemeser,
              cgpa: $cgpa,
              bloodGroup: $bloodGroup,
              skillId: $skillId,
              achievements: $achievements,
              hobby: $hobby,
              classRoutine: $classRoutine,
              isApproved: $isApproved,
            }
          ) {
            id,
            fullName,
            studentId,
            clubId,
            designation,
            isExecutive,
            isModerators,
            startdate,
            endDate,
            photoUrl,
            cvUrl,
            signatureUrl,
            youtubeLink,
            email,
            phoneNumber,
            earnedCredit,
            semester,
            joiningSemeser,
            cgpa,
            bloodGroup,
            skillId,
            achievements,
            hobby,
            classRoutine,
            isApproved,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          slug: createClubMemberRequest.slug,
          fullName: createClubMemberRequest.fullName,
          studentId: createClubMemberRequest.studentId,
          clubId: Number(createClubMemberRequest.clubId),
          designation: createClubMemberRequest.designation,
          photoUrl: createClubMemberRequest.photoUrl,
          cvUrl: createClubMemberRequest.cvUrl,
          signatureUrl: createClubMemberRequest.signatureUrl,
          youtubeLink: createClubMemberRequest.youtubeLink,
          email: createClubMemberRequest.email,
          phoneNumber: createClubMemberRequest.phoneNumber,
          earnedCredit: createClubMemberRequest.earnedCredit,
          semester: createClubMemberRequest.semester,
          joiningSemeser: createClubMemberRequest.joiningSemeser,
          cgpa: createClubMemberRequest.cgpa,
          bloodGroup: createClubMemberRequest.bloodGroup,
          skillId: createClubMemberRequest.skillId,
          achievements: createClubMemberRequest.achievements,
          hobby: createClubMemberRequest.hobby,
          classRoutine: createClubMemberRequest.classRoutine,
          isApproved: createClubMemberRequest.isApproved,
          isExecutive: createClubMemberRequest.isExecutive,
          isModerators: createClubMemberRequest.isModerators,
          startdate: createClubMemberRequest.startdate,
          endDate: createClubMemberRequest.endDate,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      let fileMap: Record<string, string[]> = {};
      let hasFiles = false;
      let fileIndex = 0;

      if (createClubMemberRequest.photoUrl) {
        fileMap[`${fileIndex}`] = ["variables.photoUrl"];
        hasFiles = true;
        fileIndex++;
      }

      if (createClubMemberRequest.cvUrl) {
        fileMap[`${fileIndex}`] = ["variables.cvUrl"];
        hasFiles = true;
        fileIndex++;
      }

      if (createClubMemberRequest.signatureUrl) {
        fileMap[`${fileIndex}`] = ["variables.signatureUrl"];
        hasFiles = true;
        fileIndex++;
      }

      formData.append("map", hasFiles ? JSON.stringify(fileMap) : "{}");

      let appendIndex = 0;

      if (createClubMemberRequest.photoUrl) {
        formData.append(
          appendIndex.toString(),
          createClubMemberRequest.photoUrl
        );
        appendIndex++;
      }

      if (createClubMemberRequest.cvUrl) {
        formData.append(appendIndex.toString(), createClubMemberRequest.cvUrl);
        appendIndex++;
      }

      if (createClubMemberRequest.signatureUrl) {
        formData.append(
          appendIndex.toString(),
          createClubMemberRequest.signatureUrl
        );
        appendIndex++;
      }

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  updateClubMember: async (
    updateClubMemberRequest: UpdateClubMemberRequest
  ): Promise<Response<ClubMember>> => {
    try {
      const url: string = BASE_URL;
      const formData = new FormData();

      const jsonData = {
        query: `mutation UpdateClubMember (
            $id: Int!,
            $slug: String,
            $fullName: String!,
            $studentId: String,
            $clubId: Int,
            $designation: String,
            $photoUrl: Upload,
            $cvUrl: Upload,
            $signatureUrl: Upload,
            $youtubeLink: String,
            $email: String,
            $phoneNumber: String,
            $earnedCredit: String,
            $semester: String,
            $joiningSemeser: String,
            $cgpa: String,
            $bloodGroup: String,
            $skillId: [Int!]!,
            $achievements: String,
            $hobby: String,
            $classRoutine: String,
            $isApproved: YesOrNo,
            $isExecutive: YesOrNo,
            $isModerators: YesOrNo,
            $startdate: DateTime,
            $endDate: DateTime
        ) {
          updateClubMember (
            updateClubMemberInput: {
              id: $id,
              slug: $slug,
              fullName: $fullName,
              studentId: $studentId,
              clubId: $clubId,
              designation: $designation,
              photoUrl: $photoUrl,
              cvUrl: $cvUrl,
              signatureUrl: $signatureUrl,
              youtubeLink: $youtubeLink,
              email: $email,
              phoneNumber: $phoneNumber,
              earnedCredit: $earnedCredit,
              semester: $semester,
              joiningSemeser: $joiningSemeser,
              cgpa: $cgpa,
              bloodGroup: $bloodGroup,
              skillId: $skillId,
              achievements: $achievements,
              hobby: $hobby,
              classRoutine: $classRoutine,
              isApproved: $isApproved,
              isExecutive: $isExecutive,
              isModerators: $isModerators,
              startdate: $startdate,
              endDate: $endDate,
            }
          ) {
            id,
            slug,
            fullName,
            studentId,
            clubId,
            designation,
            photoUrl,
            cvUrl,
            signatureUrl,
            youtubeLink,
            email,
            phoneNumber,
            earnedCredit,
            semester,
            joiningSemeser,
            cgpa,
            bloodGroup,
            skillId,
            achievements,
            hobby,
            classRoutine,
            isApproved,
            isExecutive,
            isModerators,
            startdate,
            endDate,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          id: updateClubMemberRequest.id,
          slug: updateClubMemberRequest.slug,
          fullName: updateClubMemberRequest.fullName,
          studentId: updateClubMemberRequest.studentId,
          clubId: Number(updateClubMemberRequest.clubId),
          designation: updateClubMemberRequest.designation,
          photoUrl: updateClubMemberRequest.photoUrl,
          cvUrl: updateClubMemberRequest.cvUrl,
          signatureUrl: updateClubMemberRequest.signatureUrl,
          youtubeLink: updateClubMemberRequest.youtubeLink,
          email: updateClubMemberRequest.email,
          phoneNumber: updateClubMemberRequest.phoneNumber,
          earnedCredit: updateClubMemberRequest.earnedCredit,
          semester: updateClubMemberRequest.semester,
          joiningSemeser: updateClubMemberRequest.joiningSemeser,
          cgpa: updateClubMemberRequest.cgpa,
          bloodGroup: updateClubMemberRequest.bloodGroup,
          skillId: updateClubMemberRequest.skillId,
          achievements: updateClubMemberRequest.achievements,
          hobby: updateClubMemberRequest.hobby,
          classRoutine: updateClubMemberRequest.classRoutine,
          isApproved: updateClubMemberRequest.isApproved,
          isExecutive: updateClubMemberRequest.isExecutive,
          isModerators: updateClubMemberRequest.isModerators,
          startdate: updateClubMemberRequest.startdate,
          endDate: updateClubMemberRequest.endDate,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      let fileMap: Record<string, string[]> = {};
      let hasFiles = false;
      let fileIndex = 0;

      if (updateClubMemberRequest.photoUrl) {
        fileMap[`${fileIndex}`] = ["variables.photoUrl"];
        hasFiles = true;
        fileIndex++;
      }

      if (updateClubMemberRequest.cvUrl) {
        fileMap[`${fileIndex}`] = ["variables.cvUrl"];
        hasFiles = true;
        fileIndex++;
      }

      if (updateClubMemberRequest.signatureUrl) {
        fileMap[`${fileIndex}`] = ["variables.signatureUrl"];
        hasFiles = true;
        fileIndex++;
      }

      formData.append("map", hasFiles ? JSON.stringify(fileMap) : "{}");

      let appendIndex = 0;

      if (updateClubMemberRequest.photoUrl) {
        formData.append(
          appendIndex.toString(),
          updateClubMemberRequest.photoUrl
        );
        appendIndex++;
      }

      if (updateClubMemberRequest.cvUrl) {
        formData.append(appendIndex.toString(), updateClubMemberRequest.cvUrl);
        appendIndex++;
      }

      if (updateClubMemberRequest.signatureUrl) {
        formData.append(
          appendIndex.toString(),
          updateClubMemberRequest.signatureUrl
        );
        appendIndex++;
      }

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  removeClubMember: async (
    removeClubMemberRequest: RemoveClubMemberRequest
  ): Promise<Response<ClubMember>> => {
    try {
      const url: string = BASE_URL;

      const jsonData = {
        query: `mutation RemoveClubMember ( $id: Int! ) {
          removeClubMember (id: $id) {
            id,
            slug,
            fullName,
            studentId,
            clubId,
            designation,
            email,
            phoneNumber,
            earnedCredit,
            semester,
            joiningSemeser,
            cgpa,
            bloodGroup,
            skillId,
            achievements,
            hobby,
            classRoutine,
            isApproved,
            isExecutive,
            isModerators,
            startdate,
            endDate,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
          }
        }`,
        variables: {
          id: removeClubMemberRequest.id,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
