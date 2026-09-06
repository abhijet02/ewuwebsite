export interface Inquery {
  id: number;
  fullName: string;
  studentId: string;
  phoneNumber: string;
  studentEmail: string;
  email: string;
  subject: string;
  message: string;
  attachmentUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetInquerysRequest {
  page: number;
  limit: number;
}

export interface GetInquerysResponse {
  allInquery: Inquery[];
}

export interface CreateInqueryRequest {
  fullName: string;
  studentId: string;
  phoneNumber: string;
  studentEmail: string;
  email: string;
  subject: string;
  message: string;
  attachmentUrl: Blob;
}

export interface CreateInqueryResponse {
  createInquery: Inquery;
}

export interface UpdateInqueryRequest extends CreateInqueryRequest {
  id: number;
}

export interface UpdateInqueryResponse {
  updateInquery: Inquery;
}

export interface RemoveInqueryRequest {
  id: number;
}

export interface RemoveInqueryResponse {
  removeInquery: Inquery;
}
