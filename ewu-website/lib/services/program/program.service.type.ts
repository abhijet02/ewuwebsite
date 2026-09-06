export interface Program {
  id: number;
  title: string;
  programCategoryId: number;
  semester: string;
  facultyId: number;
  departmentId: number;
  order: number;
  programDetails: string;
  admissionDeadline: Date;
  admissionDeadlineText: string;
  credit: number;
  tutionfeePerCredit: number;
  tutionfeeTotal: number;
  labFee: number;
  dateOfaddissionTest: Date;
  dateOfadmissionTestText: string;
  admissionFee: number;
  termsAndCondition: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetProgramsRequest {
  page: number;
  limit: number;
}

export interface GetProgramsResponse {
  programs: Program[];
}
