export enum Publish {
  YES = "YES",
  NO = "NO",
}

export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export enum JobType {
  FULLTIME = "FULLTIME",
  PARTTIME = "PARTTIME",
  CONTACTUAL = "CONTACTUAL",
}

export interface Job {
  id: number;
  pageId: number;
  order: number;
  slug: string;
  title: string;
  designation: string;
  ageLimit: number;
  ageLimitDate: Date;
  officeId: number;
  departmentId: number;
  facultyId: number;
  date: Date;
  deadline: Date;
  jobDescription: string;
  jobCircularUrl: string;
  jobtype: JobType;
  fbLink: string;
  xLink: string;
  inLink: string;
  email: string;
  exeperience: string;
  education: string;
  isPublished: Publish;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
  numberOfVacancy: number;
  isApplyNowShow: YesOrNo;
}

export interface GetJobsRequest {
  page: number;
  limit: number;
}

export interface GetJobsResponse {
  jobs: Job[];
}
