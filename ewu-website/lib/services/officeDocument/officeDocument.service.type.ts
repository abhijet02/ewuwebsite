export interface OfficeDocument {
  id: number;
  officeId: number;
  order: number;
  fileName: string;
  fileUrl?: string;
  link?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy?: number;
}

export interface GetOfficeDocumentsRequest {
  page: number;
  limit: number;
}

export interface GetOfficeDocumentsResponse {
  officeDocuments: OfficeDocument[];
}

export interface CreateOfficeDocumentRequest {
  officeId: number;
  order: number;
  fileName: string;
  link: string;
  fileUrl?: Blob;
}

export interface CreateOfficeDocumentResponse {
  createOfficeDocument: OfficeDocument;
}

export interface UpdateOfficeDocumentRequest
  extends CreateOfficeDocumentRequest {
  id: number;
}

export interface UpdateOfficeDocumentResponse {
  updateOfficeDocument: OfficeDocument;
}

export interface RemoveOfficeDocumentRequest {
  id: number;
}

export interface RemoveOfficeDocumentResponse {
  removeOfficeDocument: OfficeDocument;
}
