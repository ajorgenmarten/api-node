import passport from "passport";
import User from "../users/model";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../users/types";
import { tokenFromCookie } from "./passport";
import Errors from '../../utils/erros-code'

export const passport_local_login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local',
    {session:false},
    (error: any, user: Express.User) => {
        if(error) return res.status(500).json({success:false, error: Errors.mongo.find})
        if(!user) return res.status(401).json({success:false, error: Errors.auth.invalid_credentials})
        req.user = user
        next()
    })(req, res, next)
}

export const verify_user_register = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body as IUser
    const existUsername = await User.findOne({username}).count()
    const exitsEmail = await User.findOne({email:username}).count()
    if(existUsername) return res.status(400).json({success:false, error: Errors.auth.exist_username})
    if(exitsEmail) return res.status(400).json({success:false, error: Errors.auth.exist_email})
    next()
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt-refresh', 
        {session:false},
        (error: any, user: IUser) => {
            
            if(error) return res.status(500).json({success:false, error: Errors.mongo.find})
            if(!user) return res.status(401).json({success:false, error: Errors.auth.unauthorized})
            const isActive = user.sessions.some(({token}) => {
                return token == tokenFromCookie(req)
            })
            if(!isActive) {
                res.clearCookie('refreshToken')
                return res.status(401).json({success:false, error: Errors.auth.unauthorized})
            }
            req.user = user
            next()
        })(req, res, next)
}

export const notLogged = (req: Request, res: Response, next: NextFunction) => {
    const refresh = tokenFromCookie(req)
    if(!refresh) return next()
    passport.authenticate('jwt-refresh',
        {session:false},
        (error: any, user: IUser ) => {
            if(error) return res.status(500).json({success:false, error: Errors.mongo.find})
            if(!user) { res.clearCookie('refreshToken'); return next() }
            const isActive = user.sessions.some( ({token}) => {
                return token === tokenFromCookie(req)
            })
            if(!isActive) {
                res.clearCookie('refreshToken')
                return next()   
            }
            return res.status(403).json({success:false, error: Errors.auth.is_logged})
        })(req, res, next)   
}

export const access = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt-access',
        {session:false},
        (error:any, user:Express.User) => {            
            if(error) return res.status(500).json({success:false, error:Errors.mongo.find})
            if(!user) return res.status(401).json({success:false, error:Errors.auth.unauthorized})
            return next()
        })(req, res, next)
}