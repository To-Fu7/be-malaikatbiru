import express from 'express'
import { configDotenv } from 'dotenv'
import userController from './controller/userController.js'
import cors from 'cors'

configDotenv()
const app = express()

app.use(express.json())
app.use(cors())

app.get('/user', userController.getUser)
app.post('/user', userController.createUser)

app.listen(process.env.PORT, () => {
  console.log(`Application listening on port: ${process.env.PORT}`)
})
