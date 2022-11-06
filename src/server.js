import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import connectDB from './config/db.js'
import { DEVELOPMENT } from './config/constants.js'
import { notFound, errorHandler } from './middleware/errorMIddleware.js'

import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()

const app = express()

if (process.env.NODE_ENV === DEVELOPMENT) app.use(morgan('dev'))

app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		origin: ['http://localhost:3000'],
		credentials: true,
	})
)

app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)
