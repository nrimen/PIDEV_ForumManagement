export interface FeedBackModuleModule {
  idFeedBack?: number;
  submitedDate: Date;
  feedBackContent: string;
  rating: number;
  feedBackType: FeedBackType;
  priority: Priority;
}

export enum FeedBackType {
  General_FeedBack = 'General_FeedBack',
  Bug_Report = 'Bug_Report',
  Feature_Request = 'Feature_Request'
}

export enum Priority {
  Low  = 'Low',
  Medium = 'Medium',
  High = 'High'
}
