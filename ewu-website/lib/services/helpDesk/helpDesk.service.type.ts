export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface HelpDesk {
  id: number;
  name: string;
  email: string;
  departmentId: number;
  link: string;
  iconPath: string;
  isContact: YesOrNo;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetHelpDesksRequest {
  page: number;
  limit: number;
}

export interface GetHelpDesksResponse {
  allHelpDesk: HelpDesk[];
}
