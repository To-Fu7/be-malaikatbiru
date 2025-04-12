import userRepository from '../repository/userRepository.js'

const getUser = async () => {
  return await userRepository.getUser()
}

const createUser = async (data) => {
  return await userRepository.createUser(data)
}

export default {
  getUser,
  createUser
}
