import { Router } from "express";
import passport from "passport"
import { jwtAccess, jwtRefresh, local } from "./passport"
import { login, logout, refreshToken, register } from "./controller";
import { isAuth, notLogged, passport_local_login, verify_user_register } from "./middlewares";
import { registerSchema } from "./schema-validation";

passport.use(local)
passport.use('jwt-refresh', jwtRefresh)
passport.use('jwt-access', jwtAccess)

const router = Router()

router.post('/register',
    notLogged,
    registerSchema,
    verify_user_register,
    register)

router.post('/login',
    notLogged,
    passport_local_login,
    login)

router.get('/logout',
    isAuth,
    logout)

router.get('/refresh-token',
    isAuth,
    refreshToken)

export default router