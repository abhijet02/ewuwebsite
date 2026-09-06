export enum Publish {
  YES = "YES",
  NO = "NO",
}

export interface StudentsSay {
  id: number;
  pageId: number;
  departmentId: number;
  name: string;
  designation: string;
  description: string;
  year: string;
  photoUrl: string;
  attachmentUrl: string;
  order: number;
  isPublished: Publish;
  createdAt: Date;
  updateAt: Date;
  createdBy: number;
  updateBy: number;
}

export interface GetStudentsSaysRequest {
  page: number;
  limit: number;
}

export interface GetStudentsSaysResponse {
  allfeedbackOfStudent: StudentsSay[];
}
