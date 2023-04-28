 import { Request, Response } from "express";
import { tokenAccess, tokenRefresh } from "../../utils/jsonwebtoken";
import { userAgentExtract } from "../../utils/ua-parser";
import User from "../users/model"
import Role from '../roles/model'
import Errors from "../../utils/erros-code"
import { AuthUser } from "./types";
import { tokenFromCookie } from "./passport";

export const login = async (req: Request, res: Response) => {
    try {
        const user = req.user as AuthUser
        const accessToken = tokenAccess({_id: user._id})
        const refreshToken = tokenRefresh({_id: user._id}) 
        user.sessions.push({name:userAgentExtract(req), token:refreshToken})
        await user.save()
        res.cookie('refreshToken', refreshToken, {httpOnly:true, expires: new Date(Date.now() + 60 * 60 * 24 *30 * 1000)})   
        res.json({success:true, accessToken})
    } catch {
        res.status(500).json({success:false, error: Errors.mongo.find})
    }
}

export const register = async (req: Request, res: Response) => {
    const user = await User.create(req.body)
    const role = await Role.findOne({name:'user'})
    const accessToken = tokenAccess({_id: user._id})
    const refreshToken = tokenRefresh({_id: user._id})
    if(role) user.roles.push(role._id)
    user.sessions.push({name:userAgentExtract(req), token:refreshToken})
    await user.save()
    res.cookie('refreshToken', refreshToken, {httpOnly:true})
    res.status(201).json({success:true, accessToken})
}

export const logout = async (req:Request, res: Response) => {
    const user = req.user as AuthUser
    user.sessions.forEach(async ({token}, i) => {
        if(token == tokenFromCookie(req)) {
            user.sessions.splice(i)
            await user.save()
            return
        }
    })
    res.clearCookie('refreshToken')
    res.json({success:true})
}

export const refreshToken = async (req: Request, res: Response) => {
    const {_id} = req.user as AuthUser
    const accessToken = tokenAccess({_id})
    res.json({success:true, accessToken})
}