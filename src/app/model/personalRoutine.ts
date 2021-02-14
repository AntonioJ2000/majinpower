import { User } from "./user";

export interface PersonalRoutine{
    id:any;
    title:string,
    description:string,
    duration:any,
    difficulty:string,
    timesDone:any,
    user:User
}