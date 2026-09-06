export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface ClubMember {
  id: number;
  slug: string;
  fullName: string;
  studentId: string;
  clubId: number;
  designation?: string;
  photoUrl?: string;
  cvUrl?: string;
  signatureUrl?: string;
  youtubeLink?: string;
  email?: string;
  phoneNumber: string;
  earnedCredit: string;
  semester: string;
  joiningSemeser: string;
  cgpa: string;
  bloodGroup: string;
  skillId: number[];
  achievements?: string;
  hobby?: string;
  classRoutine?: string;
  isApproved: YesOrNo;
  isExecutive: YesOrNo;
  isModerators: YesOrNo;
  startdate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface GetClubMembersRequest {
  page: number;
  limit: number;
}

export interface GetClubMembersResponse {
  clubMembers: ClubMember[];
}

export interface CreateClubMemberRequest {
  slug: string;
  fullName: string;
  studentId: string;
  clubId: number;
  designation?: string;
  photoUrl?: Blob;
  cvUrl?: Blob;
  signatureUrl?: Blob;
  youtubeLink?: string;
  email?: string;
  phoneNumber: string;
  earnedCredit: string;
  semester: string;
  joiningSemeser: string;
  cgpa: string;
  bloodGroup: string;
  skillId: number[];
  achievements?: string;
  hobby?: string;
  classRoutine?: string;
  isApproved?: YesOrNo;
  isExecutive: YesOrNo;
  isModerators: YesOrNo;
  startdate?: Date;
  endDate?: Date;
}

export interface CreateClubMemberResponse {
  createClubMember: ClubMember;
}

export interface UpdateClubMemberRequest extends CreateClubMemberRequest {
  id: number;
}

export interface UpdateClubMemberResponse {
  updateClubMember: ClubMember;
}

export interface RemoveClubMemberRequest {
  id: number;
}

export interface RemoveClubMemberResponse {
  removeClubMember: ClubMember;
}
