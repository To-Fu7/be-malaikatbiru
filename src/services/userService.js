import * as userRepository from '../repository/userRepository.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const login = async ({ username, password }) => {
  const user = await userRepository.findByUsername(username)
  if (!user) throw { status: 404, message: 'User not found' }

  const valid = await bcrypt.compare(password, user.pass)
  if (!valid) throw { status: 401, message: 'Invalid credentials' }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  return { token }
}

export const register = async (userData) => {
  const hashed = await bcrypt.hash(userData.password, 10)
  userData.pass = hashed
  await userRepository.create(userData)
}

export const getAllUsers = async () => {
  return await userRepository.findAll()
}
