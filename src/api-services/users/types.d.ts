import { Types } from "mongoose";

export interface IUser  {
    name:string,
    username:string,
    password:string,
    email?:string,
    sessions: Types.DocumentArray<Session>,
    roles: Types.ObjectId[]
}
export type Session = {
    name: string,
    token: string,
    created?: Date,
}
export type IUserInstanceMethods = {
    comparePassword: (plainPassword: string) => Promise<boolean>
}