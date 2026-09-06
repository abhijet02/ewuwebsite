export interface AuthResponse {
  userName: string;
  token: string;
  tokenExpiresAfterInMinutes: string;
}

export interface StudentInfo {
  message: string;
  status: string;
  studentId: string;
  uniqueId: string;
  studentName: string;
  programCode: number;
  programName: string;
  programShortName: string;
  academicDepartmentName: string;
  cgpa: string;
  creditsCompleted: number;
  mobileNo: string;
  personalEmailAddress: string;
  fatherMobileNo: string;
  motherMobileNo: string;
  fatherName: string;
  motherName: string;
  dateofBirth: string;
  bloodGroup: string;
  nationalId: string;
  birthRegistrationNo: string;
  presentAddress: string;
  permanentAddress: string;
  convocationName: string;
  major: string;
  minor: string;
  completionSemester: string;
}

export interface ApiError {
  message: string;
  status: number;
}
