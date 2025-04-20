import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import { getUser, getProfiles } from './controller/userController.js';
import { userLogin, userRegister } from './controller/authController.js'
import { verifyToken } from './middleware/authMiddleware.js'

configDotenv()
const app = express()

app.use(express.json())
app.use(cors())

// authentication
// -login user
app.post('/auth/login', userLogin)
// -register user 
app.post('/auth/register', userRegister)

// user routes
app.get('/user', getUser)
app.get('/user/profiles', verifyToken, getProfiles)

app.listen(process.env.PORT, () => {
  console.log(`Application listening on port: ${process.env.PORT}`)
})
