import { Strategy as localStrategy } from 'passport-local'
import { ExtractJwt, JwtFromRequestFunction, Strategy as jwtStrategy, VerifyCallback } from "passport-jwt";
import User from "../users/model"
import config from '../../config';

// Custom extractor
export const tokenFromCookie: JwtFromRequestFunction = (req) => {return req.cookies['refreshToken']}

const jwtVerify: VerifyCallback = async ({_id}, done) => {
    try {
        const user = await User.findById(_id)
        if(!user) return done(null, false)
        return done(null, user)
    } catch (error) {
        done(error, false)
    }
}

export const local = new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, async (username, password, done) => {
    try {
        const user = await User.findOne({$or: [{username}, {email:username}]})
        if(!user) return done(null, false)
        const match = await user.comparePassword(password)
        if(!match) return done(null, false)
        return done(null, user)
    } catch (error) {
        return done(error, false)
    }
})

export const jwtAccess = new jwtStrategy({
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT.ACCESS
},jwtVerify)

export const jwtRefresh = new jwtStrategy({
    jwtFromRequest: tokenFromCookie,
    secretOrKey: config.JWT.REFRESH
}, jwtVerify)