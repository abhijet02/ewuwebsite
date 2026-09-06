export enum UserType {
  SUPERADMIN = "SUPERADMIN",
  OTHER = "OTHER",
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  mobileNo: string;
  bloodGroup: string;
  userType: UserType;
  roleId: number;
  email: string;
  password: string;
  rememberToken: string;
  emailVarifiedAt: string;
  activateStatus: boolean;
  profilePhotoUrl: string;
  signatureUrl: string;
  facultyId: number[];
  facultyPersonId: number[];
  departmentId: number[];
  officeId: number[];
  officeMemberId: number[];
  clubId: number[];
  clubMemberId: number[];
  createdAt: Date;
  updateAt: Date;
}

export interface GetUsersRequest {
  page: number;
  limit: number;
}

export interface GetUsersResponse {
  users: User[];
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  mobileNo: string;
  bloodGroup: string;
  email: string;
  password: string;
  userType: UserType;
  roleId: number;
  activateStatus: boolean;
  profilePhotoUrl?: Blob;
  signatureUrl?: Blob;
  facultyId?: number[];
  facultyPersonId?: number[];
  departmentId?: number[];
  officeId?: number[];
  officeMemberId?: number[];
  clubId?: number[];
  clubMemberId?: number[];
}

export interface CreateUserResponse {
  createUser: User;
}

export interface UpdateUserRequest extends CreateUserRequest {
  id: number;
}

export interface UpdateUserResponse {
  updateUser: User;
}

export interface RemoveUserRequest {
  id: number;
}

export interface RemoveUserResponse {
  removeUser: User;
}
