import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import AuthRouter from './routes/auth.route.js'
import GithubRouter from './routes/github.route.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(cookieParser())

app.use('/api/auth', AuthRouter)
app.use('/api/github', GithubRouter)

mongoose.connect(process.env.MONGODB_CONN)
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Database connection failed', err))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})