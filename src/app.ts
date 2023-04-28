import express from 'express'
import cookie from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import passport from 'passport'

dotenv.config()

import "./database"
import config from './config'
import auhtRoutes from './api-services/auth/router'
import todoRoutes from './api-services/todo/router'

const app = express()

app.set('PORT', config.SERVER.PORT)

app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookie())
app.use(passport.initialize())

app.use(express.static('./public'))
app.use('/auth', auhtRoutes)
app.use('/todo', todoRoutes)

export default app
