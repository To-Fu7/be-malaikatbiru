import express from 'express'
import { configDotenv } from 'dotenv'
import cors from 'cors'
import { loginUser, registerUser } from './controller/authController.js'
import { getUser } from './controller/userController.js'
import { verifyToken } from './middleware/authMiddleware.js'

configDotenv()
const app = express()

app.use(express.json())
app.use(cors())

// Auth Routes
app.post('/auth/login', loginUser)
app.post('/auth/register', registerUser)

// User Routes (now protected)
app.get('/user', verifyToken, getUser)

app.listen(process.env.PORT, () => {
  console.log(`Application listening on port: ${process.env.PORT}`)
})