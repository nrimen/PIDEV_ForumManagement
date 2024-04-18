import { UserModuleModule } from "../Modules/user-module/user-module.module";



export class Request {
    idRequest!: number;
    requestTitle: string | undefined;
    requestContent: string | undefined;
    postingDate: Date | undefined;
    location: string | undefined;
    cv: string | undefined;
    requestField: string | undefined;
    userRequest: UserModuleModule | null | undefined;
    //userRequest: User;
}