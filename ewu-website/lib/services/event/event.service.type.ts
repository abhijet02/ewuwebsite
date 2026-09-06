export enum Publish {
  YES = "YES",
  NO = "NO",
}

export enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

export interface EventSpeaker {
  id: number;
  eventId: number;
  name: string;
  designation: string;
  companyName: string;
  photoUrl: string;
  createdAt: Date;
  updateAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface EventAttachment {
  id: number;
  eventId: number;
  attachmentUrl: string;
  attachmentName: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface CreateEventSpeakerRequest {
  name: string;
  designation: string;
  companyName: string;
  photoUrl: Blob;
}

export interface Event {
  id: number;
  pageId: number;
  isCopiedTo: number[];
  category: string;
  title: string;
  slug: string;
  order: number;
  fromDate: Date;
  toDate: Date;
  location: string;
  description: string;
  attachmentUrl: string;
  attachmentName: string;
  eventSpeaker: EventSpeaker[];
  attachments: EventAttachment[];
  isMarquee: YesOrNo;
  isPublished: Publish;
  isArchived: YesOrNo;
  isApprovedByAdmin: YesOrNo;
}

export interface GetEventsRequest {
  page: number;
  limit: number;
  pageId?: number;
}

export interface GetEventsResponse {
  events: Event[];
}
