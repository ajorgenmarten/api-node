import { Schema, model } from "mongoose";
import { ITodo } from "./types";

const todoSchema = new Schema<ITodo>({
    title: String,
    description: String,
    author: {type:Schema.Types.ObjectId, ref:'user'},
    check: {type:Boolean, default:false},
},{
    versionKey:false,
    timestamps:true
})

export default model<ITodo>('todo', todoSchema)