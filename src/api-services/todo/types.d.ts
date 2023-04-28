import { HydratedDocument, Types } from "mongoose";

export interface ITodo {
    title:string,
    description: string,
    author: Types.ObjectId,
    check: boolean,
}

export interface ITodoModel extends HydratedDocument<ITodo> {}