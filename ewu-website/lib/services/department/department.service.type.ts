export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface Department {
  id: number;
  slug: string;
  name: string;
  description: string;
  mission: string;
  vision: string;
  order: number;
  facultyId: number;
  photoUrl: string;
  isSubDepartment: YesOrNo;
  createdAt: Date;
  updateAt: Date;
  createdBy: number;
  updateBy: number;
}

export interface GetDepartmentsRequest {
  page: number;
  limit: number;
}

export interface GetDepartmentsResponse {
  getDepartments: Department[];
}
