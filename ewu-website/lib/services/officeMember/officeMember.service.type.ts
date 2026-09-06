export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface OfficeMember {
  id: number;
  officeId: number;
  officeIds: number[];
  name: string;
  slug: string;
  designation: string;
  designationText: string;
  jobType: string;
  order: number;
  profilePhotoUrl?: string;
  signatureUrl?: string;
  cvUrl?: string;
  telephone: string;
  ext?: string;
  location?: string;
  email?: string;
  fbLink?: string;
  xLink?: string;
  youtubeLink?: string;
  linkedInLink?: string;
  githubLink: string;
  portfolioLink: string;
  pinterestLink: string;
  instagramLink: string;
  message: string;
  previousWorkExperience?: string;
  educationDescription?: string;
  careerDescription?: string;
  onLeaveText: String;
  onLeave: YesOrNo;
  isPublished: YesOrNo;
  isMember: YesOrNo;
  isBoT: YesOrNo;
  isheadOfOffice: YesOrNo;
  isProctor: YesOrNo;
  isAssProctor: YesOrNo;
  isSupportMember: YesOrNo;
  isOfficeMember: YesOrNo;
  isMemberSecretary?: YesOrNo;
  dateOfJoining: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface GetOfficeMembersRequest {
  page: number;
  limit: number;
}

export interface GetOfficeMembersResponse {
  officeMembers: OfficeMember[];
}

export interface CreateOfficeMemberRequest {
  officeId: number;
  officeIds: number[];
  name: string;
  slug: string;
  jobType: string;
  designation: string;
  designationText: string;
  order: number;
  profilePhotoUrl?: Blob;
  signatureUrl?: Blob;
  cvUrl?: Blob;
  telephone: string;
  ext?: string;
  location?: string;
  email?: string;
  fbLink?: string;
  xLink?: string;
  youtubeLink?: string;
  linkedInLink?: string;
  githubLink: string;
  portfolioLink: string;
  pinterestLink: string;
  instagramLink: string;
  message?: string;
  previousWorkExperience?: string;
  educationDescription?: string;
  careerDescription?: string;
  onLeaveText: String;
  onLeave: YesOrNo;
  isPublished: YesOrNo;
  isMember: YesOrNo;
  isBoT: YesOrNo;
  isheadOfOffice?: YesOrNo;
  isProctor: YesOrNo;
  isAssProctor: YesOrNo;
  isSupportMember: YesOrNo;
  isOfficeMember: YesOrNo;
  isMemberSecretary?: YesOrNo;
  dateOfJoining: Date;
}

export interface CreateOfficeMemberResponse {
  createOfficeMember: OfficeMember;
}

export interface UpdateOfficeMemberRequest extends CreateOfficeMemberRequest {
  id: number;
}

export interface UpdateOfficeMemberResponse {
  updateOfficeMember: OfficeMember;
}

export interface RemoveOfficeMemberRequest {
  id: number;
}

export interface RemoveOfficeMemberResponse {
  removeOfficeMember: OfficeMember;
}
