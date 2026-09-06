export enum Publish {
  YES = "YES",
  NO = "NO",
}

export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface JobApplication {
  id: number;
  jobId: number;
  name: string;
  designation: string;
  email: string;
  phone: string;
  dob: Date;
  address: string;
  coverLetter?: string;
  cvUrl: string;
  coverLetterUrl: string;
  attachmentUrl: string;
  photoUrl: string;
  isPublished: Publish;
  isChecked: YesOrNo;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetJobApplicationsRequest {
  page: number;
  limit: number;
}

export interface GetJobApplicationsResponse {
  jobApplications: JobApplication[];
}

export interface CreateJobApplicationRequest {
  jobId: number;
  name: string;
  designation: string;
  email: string;
  phone: string;
  dob: Date;
  address: string;
  coverLetter?: string;
  cvUrl: Blob;
  coverLetterUrl: Blob;
  attachmentUrl: Blob;
  photoUrl: Blob;
  isPublished: Publish;
  isChecked: YesOrNo;
}

export interface CreateJobApplicationResponse {
  createJobApplication: JobApplication;
}

export interface UpdateJobApplicationRequest
  extends CreateJobApplicationRequest {
  id: number;
}

export interface UpdateJobApplicationResponse {
  updateJobApplication: JobApplication;
}

export interface RemoveJobApplicationRequest {
  id: number;
}

export interface RemoveJobApplicationResponse {
  removeJobApplication: JobApplication;
}
