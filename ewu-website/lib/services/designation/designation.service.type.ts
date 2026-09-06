export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface Designation {
  id: number;
  designation: string;
  order: number;
  isClub: YesOrNo;
  isOffice: YesOrNo;
  isfaculty: YesOrNo;
}

export interface GetDesignationsRequest {
  page: number;
  limit: number;
}

export interface GetDesignationsResponse {
  designations: Designation[];
}
