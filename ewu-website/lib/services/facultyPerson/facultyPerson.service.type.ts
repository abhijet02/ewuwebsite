export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface FacultyPerson {
  id: number;
  slug: string;
  facultyId: number;
  departmentId: number;
  courseId: number;
  jobType: string;
  designation: string;
  dateOfJoining: Date;
  isDean: YesOrNo;
  isChairperson: YesOrNo;
  isCoordinator: YesOrNo;
  isAdjunct: YesOrNo;
  isProctor: YesOrNo;
  isAssProctor: YesOrNo;
  isBoT: YesOrNo;
  isAdvisor?: YesOrNo;
  onLeaveText: string;
  onLeave: YesOrNo;
  name: string;
  roomNo: string;
  photo: string;
  signatureUrl: string;
  cvUrl: string;
  message: string;
  biography: string;
  eduDetails: string;
  publications: string;
  onGoingResearch: string;
  researchInterest: string;
  teachingMaterials: string;
  affiliation: string;
  achievements: string;
  participations: string;
  profDev: string;
  others: string;
  telephone: string;
  email: string;
  ext: string;
  gsLink: string;
  orcidLink: string;
  researchGateLink: string;
  scopusLink: string;
  liLink: string;
  fbLink: string;
  instaLink: string;
  xLink: string;
  order: number;
  isPublished: YesOrNo;
}

export interface GetFacultyPersonRequest {
  page: number;
  limit: number;
}

export interface GetFacultyPersonResponse {
  facultyPersons: FacultyPerson[];
}

export interface CreateFacultyPersonRequest {
  slug: string;
  facultyId: number;
  departmentId: number;
  courseId: number;
  jobType: string;
  designation: string;
  dateOfJoining: Date;
  isDean: YesOrNo;
  isChairperson: YesOrNo;
  isCoordinator: YesOrNo;
  isAdjunct: YesOrNo;
  isProctor: YesOrNo;
  isAssProctor: YesOrNo;
  isBoT: YesOrNo;
  isAdvisor?: YesOrNo;
  onLeaveText: string;
  onLeave: YesOrNo;
  name: string;
  roomNo: string;
  photo: Blob;
  signatureUrl: Blob;
  cvUrl: Blob;
  message: string;
  biography: string;
  eduDetails: string;
  publications: string;
  achievements: string;
  participations: string;
  onGoingResearch: string;
  researchInterest: string;
  teachingMaterials: string;
  affiliation: string;
  profDev: string;
  others: string;
  telephone: string;
  email: string;
  ext: string;
  gsLink: string;
  orcidLink: string;
  researchGateLink: string;
  scopusLink: string;
  liLink: string;
  fbLink: string;
  instaLink: string;
  xLink: string;
  order: number;
  isPublished: YesOrNo;
}

export interface CreateFacultyPersonResponse {
  createFacultyPerson: FacultyPerson;
}

export interface UpdateFacultyPersonRequest extends CreateFacultyPersonRequest {
  id: number;
}

export interface UpdateFacultyPersonResponse {
  updateFacultyPerson: FacultyPerson;
}

export interface RemoveFacultyPersonRequest {
  id: number;
}

export interface RemoveFacultyPersonResponse {
  removeFacultyPerson: FacultyPerson;
}
