export enum Publish {
  YES = "YES",
  NO = "NO",
}

export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface CalenderDate {
  id: number;
  date: string;
  dateText: string;
  endDate: string;
  endDateText: string;
  day: string;
  event: string;
  description: string;
  semesterId: number;
  programId: number;
  isImportantDate: YesOrNo;
  classDays: string;
  lastDateOfClass: Date;
  lastDateOfClassText: string;
  finalExamDays: string;
  finalExamDate: Date;
  finalExamDateText: string;
  order: number;
  isPublished: Publish;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
}

export interface GetCalenderDatesRequest {
  page: number;
  limit: number;
}

export interface GetCalenderDatesResponse {
  calenderDates: CalenderDate[];
}
