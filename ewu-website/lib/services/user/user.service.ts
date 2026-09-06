import {
  axiosClient,
  axiosFormDataClient,
  BASE_URL,
} from "@services/axiosClient";
import { Response } from "@services/response.type";
import {
  GetUsersResponse,
  CreateUserRequest,
  UpdateUserRequest,
  UpdateUserResponse,
  RemoveUserRequest,
  RemoveUserResponse,
  GetUsersRequest,
  CreateUserResponse,
} from "./user.service.type";

export const userService = {
  getUsers: async (
    getUserRequest: GetUsersRequest
  ): Promise<Response<GetUsersResponse>> => {
    try {
      const url: string = BASE_URL || "";
      const jsonData = {
        query: `query Users ( $page: Float!, $limit: Float! ) {
          users ( page: $page, limit: $limit ) {
            id,
            firstName,
            lastName,
            mobileNo,
            bloodGroup,
            email,
            password,
            userType,
            roleId,
            rememberToken,
            emailVarifiedAt,
            activateStatus,
            profilePhotoUrl,
            signatureUrl,
            facultyId,
            facultyPersonId,
            departmentId,
            officeId,
            officeMemberId,
            clubId,
            clubMemberId,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          page: getUserRequest.page,
          limit: getUserRequest.limit,
        },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (
    createUserRequest: CreateUserRequest
  ): Promise<Response<CreateUserResponse>> => {
    try {
      const url: string = BASE_URL || "";
      const formData = new FormData();

      const jsonData = {
        query: `mutation CreateUser (
          $firstName: String!,
          $lastName: String!, 
          $mobileNo: String,
          $bloodGroup: String,
          $email: String!, 
          $password: String!, 
          $userType: UserType!,
          $roleId: Int!,
          $activateStatus: Boolean!,
          $profilePhotoUrl: Upload,
          $signatureUrl: Upload,
          $facultyId: [Int!],
          $facultyPersonId: [Int!],
          $departmentId: [Int!],
          $officeId: [Int!],
          $officeMemberId: [Int!],
          $clubId: [Int!],
          $clubMemberId: [Int!]
        ) {
          createUser(
            createUserInput: { 
              firstName: $firstName,  
              lastName: $lastName, 
              mobileNo: $mobileNo,
              bloodGroup: $bloodGroup,
              email: $email, 
              password: $password, 
              userType: $userType, 
              roleId: $roleId,
              activateStatus: $activateStatus,
              profilePhotoUrl: $profilePhotoUrl,
              signatureUrl: $signatureUrl,
              facultyId: $facultyId,
              facultyPersonId: $facultyPersonId,
              departmentId: $departmentId,
              officeId: $officeId,
              officeMemberId: $officeMemberId,
              clubId: $clubId,
              clubMemberId: $clubMemberId
            }
          ) {
            id,
            firstName,
            lastName,
            mobileNo,
            bloodGroup,
            email,
            password,
            userType,
            roleId,
            rememberToken,
            emailVarifiedAt,
            activateStatus,
            profilePhotoUrl,
            signatureUrl,
            facultyId,
            facultyPersonId,
            departmentId,
            officeId,
            officeMemberId,
            clubId,
            clubMemberId,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          firstName: createUserRequest.firstName,
          lastName: createUserRequest.lastName,
          mobileNo: createUserRequest.mobileNo,
          bloodGroup: createUserRequest.bloodGroup,
          email: createUserRequest.email,
          password: createUserRequest.password,
          userType: createUserRequest.userType,
          roleId: Number(createUserRequest.roleId),
          activateStatus: createUserRequest.activateStatus,
          facultyId: createUserRequest.facultyId,
          facultyPersonId: createUserRequest.facultyPersonId,
          departmentId: createUserRequest.departmentId,
          officeId: createUserRequest.officeId,
          officeMemberId: createUserRequest.officeMemberId,
          clubId: createUserRequest.clubId,
          clubMemberId: createUserRequest.clubMemberId,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      const fileMap: Record<string, string[]> = {};
      let fileIndex = 0;

      if (createUserRequest.profilePhotoUrl) {
        fileMap[`${fileIndex}`] = ["variables.profilePhotoUrl"];
        fileIndex++;
      }

      if (createUserRequest.signatureUrl) {
        fileMap[`${fileIndex}`] = ["variables.signatureUrl"];
        fileIndex++;
      }

      formData.append("map", JSON.stringify(fileMap));

      fileIndex = 0;

      if (createUserRequest.profilePhotoUrl) {
        formData.append(`${fileIndex}`, createUserRequest.profilePhotoUrl);
        fileIndex++;
      }

      if (createUserRequest.signatureUrl) {
        formData.append(`${fileIndex}`, createUserRequest.signatureUrl);
        fileIndex++;
      }

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (
    updateUserRequest: UpdateUserRequest
  ): Promise<Response<UpdateUserResponse>> => {
    try {
      const url: string = BASE_URL || "";
      const formData = new FormData();

      const jsonData = {
        query: `mutation UpdateUser (
          $id: Int!,
          $firstName: String,
          $lastName: String, 
          $mobileNo: String,
          $bloodGroup: String,
          $email: String, 
          $password: String, 
          $userType: UserType,
          $roleId: Int,
          $activateStatus: Boolean,
          $profilePhotoUrl: Upload,
          $signatureUrl: Upload,
          $facultyId: [Int!],
          $facultyPersonId: [Int!],
          $departmentId: [Int!],
          $officeId: [Int!],
          $officeMemberId: [Int!],
          $clubId: [Int!],
          $clubMemberId: [Int!]
        ) {
          updateUser(
            updateUserInput: {
              id: $id,
              firstName: $firstName,  
              lastName: $lastName, 
              mobileNo: $mobileNo,
              bloodGroup: $bloodGroup,
              email: $email, 
              password: $password, 
              userType: $userType, 
              roleId: $roleId,
              activateStatus: $activateStatus,
              profilePhotoUrl: $profilePhotoUrl,
              signatureUrl: $signatureUrl,
              facultyId: $facultyId,
              facultyPersonId: $facultyPersonId,
              departmentId: $departmentId,
              officeId: $officeId,
              officeMemberId: $officeMemberId,
              clubId: $clubId,
              clubMemberId: $clubMemberId
            }
          ) {
            id,
            firstName,
            lastName,
            mobileNo,
            bloodGroup,
            email,
            password,
            userType,
            roleId,
            rememberToken,
            emailVarifiedAt,
            activateStatus,
            profilePhotoUrl,
            signatureUrl,
            facultyId,
            facultyPersonId,
            departmentId,
            officeId,
            officeMemberId,
            clubId,
            clubMemberId,
            createdAt,
            updateAt,
          }
        }`,
        variables: {
          id: updateUserRequest.id,
          firstName: updateUserRequest.firstName,
          lastName: updateUserRequest.lastName,
          mobileNo: updateUserRequest.mobileNo,
          bloodGroup: updateUserRequest.bloodGroup,
          email: updateUserRequest.email,
          password: updateUserRequest.password,
          userType: updateUserRequest.userType,
          roleId: parseInt(updateUserRequest.roleId.toString()),
          activateStatus: updateUserRequest.activateStatus,
          facultyId: updateUserRequest.facultyId,
          facultyPersonId: updateUserRequest.facultyPersonId,
          departmentId: updateUserRequest.departmentId,
          officeId: updateUserRequest.officeId,
          officeMemberId: updateUserRequest.officeMemberId,
          clubId: updateUserRequest.clubId,
          clubMemberId: updateUserRequest.clubMemberId,
        },
      };

      formData.append("operations", JSON.stringify(jsonData));

      const fileMap: Record<string, string[]> = {};
      let fileIndex = 0;

      if (updateUserRequest.profilePhotoUrl) {
        fileMap[`${fileIndex}`] = ["variables.profilePhotoUrl"];
        fileIndex++;
      }

      if (updateUserRequest.signatureUrl) {
        fileMap[`${fileIndex}`] = ["variables.signatureUrl"];
        fileIndex++;
      }

      formData.append("map", JSON.stringify(fileMap));

      fileIndex = 0;

      if (updateUserRequest.profilePhotoUrl) {
        formData.append(`${fileIndex}`, updateUserRequest.profilePhotoUrl);
        fileIndex++;
      }

      if (updateUserRequest.signatureUrl) {
        formData.append(`${fileIndex}`, updateUserRequest.signatureUrl);
        fileIndex++;
      }

      const response = await axiosFormDataClient.post(url, formData);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },

  removeUser: async (
    removeUserRequest: RemoveUserRequest
  ): Promise<Response<RemoveUserResponse>> => {
    try {
      const url: string = BASE_URL || "";
      const jsonData = {
        query: `mutation RemoveUser ( $id: Int! ) {
          removeUser(id: $id) {
            id,
            firstName,
            lastName,
            mobileNo,
            bloodGroup,
            email,
            password,
            userType,
            roleId,
            rememberToken,
            emailVarifiedAt,
            activateStatus,
            profilePhotoUrl,
            signatureUrl,
            facultyId,
            facultyPersonId,
            departmentId,
            officeId,
            officeMemberId,
            clubId,
            clubMemberId,
            createdAt,
            updateAt,
          }
        }`,
        variables: { id: removeUserRequest.id },
      };

      const response = await axiosClient.post(url, JSON.stringify(jsonData));
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
