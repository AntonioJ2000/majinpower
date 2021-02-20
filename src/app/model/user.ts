import { PersonalRoutine } from "./personalRoutine";

export interface User{
    id?:any,
    loginName:string,
    password:string,
    personalRoutines?: PersonalRoutine[],
    zpower?:any;
    image?:string;
}