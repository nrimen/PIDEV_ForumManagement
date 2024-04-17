import { Application } from "./Application";
import { InterviewType } from "./InterviewType";

export class Interview {
    idInterview!: number;
    interviewType: InterviewType | undefined;
    interviewDate: Date | undefined;
    classRoom: string | undefined;
    link: string | undefined;
    application: Application | undefined;
    //userRequest: User;
}