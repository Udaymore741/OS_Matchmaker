import express from 'express'
import { getData, Login, logout } from '../controllers/auth.controller.js'

const AuthRouter = express.Router()

AuthRouter.post('/login', Login)
AuthRouter.get('/getData', getData)
AuthRouter.post('/logout', logout)

export default AuthRouter