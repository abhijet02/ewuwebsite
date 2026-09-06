export interface Course {
  id: number;
  name: string;
  courseCode: string;
  departmentId: number;
  programId: number;
  category: string;
  creditHour: number;
  order: number;
  preRequisite: string;
  description: string;
  createdAt: Date;
  updateAt: Date;
  createdBy: number;
  updateBy: number;
}

export interface GetCoursesRequest {
  page: number;
  limit: number;
}

export interface GetCoursesResponse {
  getCourses: Course[];
}
