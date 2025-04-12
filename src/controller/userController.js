import userService from '../service/userService.js'

const getUser = async (req, res) => {
  const users = await userService.getUser()
  res.send(users)
}

const createUser = async (req, res) => {
  const newUser = await userService.createUser(req.body)
  res.status(201).send(newUser)
}

export default {
  getUser,
  createUser
}
