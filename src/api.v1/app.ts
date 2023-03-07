import express, { json } from 'express'
import { loadControllers } from 'awilix-express'
import container from './container'
import cors from 'cors'
import passport from "passport"
import { passportStrategy } from '@shared/middleware/passport'
import { createServer } from 'http'
import { Server as WebSocketServer } from 'socket.io'
import { WordSocketIO } from './realtime/word.realtime'
import { authenticateMiddlewareSoketIo } from '@shared/middleware/socket.io'

const app: express.Application = express()
const server = createServer(app)
const io = new WebSocketServer(server)

app.use(json())
app.use(cors())
app.use(passport.initialize())
passport.use(passportStrategy)

container(app)
io.use(authenticateMiddlewareSoketIo)
io.on('connection', WordSocketIO)
app.use(loadControllers('controllers/**/*.ts', { cwd: __dirname }))

export { app, server }