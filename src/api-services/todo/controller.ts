import { Request, Response } from "express";
import { AuthUser } from "../auth/types";
import Todo from "./model";
import { ITodo, ITodoModel } from "./types";
import Errors from "../../utils/erros-code";

export const index = async (req: Request, res: Response) => {
    const {_id} = req.user as AuthUser
    const todos = await Todo.find({author:_id})
    res.json({success:true, todos})
}

export const create = async (req: Request, res: Response) => {
    const user = req.user as AuthUser
    const todo = new Todo(req.body)
    todo.author = user._id
    await todo.save()
    res.status(201).json({success:true, todo})
}

export const update = async (req: Request, res: Response) => {
    const {_id, ...todo} = req.body as ITodoModel
    const updated = await Todo.findByIdAndUpdate(_id, todo)
    if(updated) return res.status(201).json({success:true, updated})
    res.status(404).json({success:false, message: Errors.server.not_found})
}

export const destroy = async (req:Request, res:Response) => {
    const {_id} = req.body as ITodoModel
    const deleted = await Todo.findByIdAndDelete(_id)
    if(deleted) return res.status(201).json({success:true, deleted})
    res.status(404).json({success:false, message: Errors.server.not_found})
}