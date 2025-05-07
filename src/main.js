import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import { getUser, getProfiles, getMonsterLists, pushNewMonster, getItemlists } from './controller/userController.js';
import { userLogin, userRegister } from './controller/authController.js'
import { verifyToken } from './middleware/authMiddleware.js'

configDotenv()
const app = express()
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json())
app.use(cors())

// authentication
// -login user
app.post('/auth/login', userLogin)
// -register user 
app.post('/auth/register', userRegister)
app.post('/monsters/add', verifyToken, pushNewMonster)

// user routes
app.get('/user', getUser)
app.get('/user/profiles', verifyToken, getProfiles)
app.get('/monsters' , getMonsterLists) 
app.get('/items/list', getItemlists)


app.listen(process.env.PORT, () => {
  console.log(`Application listening on port: ${process.env.PORT}`)
})
