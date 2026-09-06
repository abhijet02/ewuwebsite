export enum MenuType {
  HEADER = "HEADER",
  FOOTER = "FOOTER",
  SIDEBAR = "SIDEBAR",
}

export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export enum MenuPosition {
  TOP = "TOP",
  BOTTOM = "BOTTOM",
}

export interface Menu {
  id: number;
  pageId?: number;
  label: string;
  link: string;
  parent: number;
  sort: number;
  mobileSort: number;
  depth: number;
  isMegaMenu: YesOrNo;
  menuPosition: MenuPosition;
  menuType: MenuType;
  hasFooterMenuButton?: YesOrNo;
  createdAt: Date;
  updateAt: Date;
}

export interface GetMenusRequest {
  page: number;
  limit: number;
}

export interface GetMenusResponse {
  menus: Menu[];
}

export interface GetMenusWithPageIdZeroResponse {
  menusWithPageIdZero: Menu[];
}
