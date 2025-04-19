import express from 'express'
import { getData, Login } from '../controllers/auth.controller.js'

const AuthRouter = express.Router()

AuthRouter.post('/login', Login)
AuthRouter.get('/get-user', getData)

export default AuthRouter