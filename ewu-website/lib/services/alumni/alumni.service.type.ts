export interface Alumni {
  id: number;
  departmentId: number;
  photoUrl: string;
  name: string;
  graduationYear: string;
  programName: string;
  organization: string;
  designation: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetAlumniRequest {
  page: number;
  limit: number;
}

export interface GetAlumniResponse {
  noteableAlumni: Alumni[];
}
