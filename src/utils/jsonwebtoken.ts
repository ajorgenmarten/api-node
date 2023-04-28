import jwt from "jsonwebtoken"
import config from "../config"

const generateToken = (payload: any, secret: string, expiresIn?: string|number) => jwt.sign(payload, secret, expiresIn != undefined ? {expiresIn} : undefined )

export const tokenAccess = (payload: any) => generateToken(payload, config.JWT.ACCESS, '15m')

export const tokenRefresh = (payload: any) => generateToken(payload, config.JWT.REFRESH)