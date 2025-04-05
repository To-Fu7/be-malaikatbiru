import express from 'express'
import userController from './controller/userController.js'
import { configDotenv } from 'dotenv'
configDotenv()

const application = express()

application.get('/user', userController.getUser)


application.listen(process.env.PORT, () => {
    console.log(`application listen port:${process.env.PORT}`);
})