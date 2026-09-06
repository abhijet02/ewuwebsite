export enum Publish {
  YES = "YES",
  NO = "NO",
}

export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface Slider {
  id: number;
  pageId: number;
  sliderMediaUrl?: string;
  watermarkLogourl?: string;
  countDownLogo?: string;
  isPublished: Publish;
  isWatermarkEnable: YesOrNo;
  isCountdownShow: YesOrNo;
  countDownDate?: string;
  countDownTime?: string;
  countDownLabel?: string;
  isBanner1Show: YesOrNo;
  banner1label?: string;
  banner1LogoLabel?: string;
  banner1LogoUrl?: string;
  isBanner2Show: YesOrNo;
  banner2label?: string;
  banner2LogoLabel?: string;
  banner2LogoUrl?: string;
  overlayText: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface GetSlidersRequest {
  page: number;
  limit: number;
}

export interface GetSlidersResponse {
  sliders: Slider[];
}
