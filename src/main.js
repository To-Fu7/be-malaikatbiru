import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import { getUser, getProfiles, getMonsterLists, pushNewMonster, getItemlists, adminGetUsers, adminPatchUser, adminRemoveUser, adminRemoveMonster } from './controller/userController.js';
import { userLogin, userRegister } from './controller/authController.js'
import { verifyToken, verifyAdmin } from './middleware/authMiddleware.js'

configDotenv()
const app = express()
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json())
app.use(cors())

app.post('/auth/login', userLogin)
app.post('/auth/register', userRegister)

app.post('/monsters/add', verifyToken, pushNewMonster)
app.get('/monsters' , getMonsterLists) 

app.get('/user', getUser)
app.get('/user/profiles', verifyToken, getProfiles)
app.get('/items/list', getItemlists)

app.get('/admin/users', verifyAdmin, adminGetUsers)
app.patch('/admin/users/:id', verifyAdmin, adminPatchUser)
app.delete('/admin/users/:id', verifyAdmin, adminRemoveUser)
app.delete('/admin/monsters/:id', verifyAdmin, adminRemoveMonster)

app.listen(process.env.PORT, () => {
  console.log(`Application listening on port: ${process.env.PORT}`)
})
