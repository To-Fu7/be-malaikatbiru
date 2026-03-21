import * as userRepo from "../repository/userRepository.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const login = async ({ username, password }) => {
  const user = await userRepo.findRegisteredUser(username)
  if(!user) throw {
    status : 404,
    message : 'user tidak di temukan'
  }
  
  const valid = await bcrypt.compare(password, user.pass)
  if(!valid) throw {
    status : 401,
    message : 'password salah'
  }

  // CREATE JWT TOKEN
  const token = jwt.sign(
    { id: user.id, username: user.username},
    process.env.JWT_SECRET,
    {expiresIn:'1d'}
  )

  return { token }
  
};

export const register = async (userData) => {
  const hashed = await bcrypt.hash(userData.password, 10)
  userData.pass = hashed
  await userRepo.createUser(userData)
};

export const getAllUsers = async () => {
  return await userRepo.findAll()
};

export const getUserById = async (id) => {
  return await userRepo.findUserById(id)
};

export const addNewMonster = async (monster) => {
  return await userRepo.createNewMonster(monster)
};

export const getAllMonsters = async () => {
  return await userRepo.getAllMonsters()
};

export const getAllItems = async () => {
  return await userRepo.getAllItems()
};

export const adminGetAllUsers = async () => {
  const users = await userRepo.findAll()
  return users.map(({ pass, ...rest }) => rest)
};

export const adminUpdateUser = async (id, fields) => {
  return await userRepo.updateUserById(id, fields)
};

export const adminDeleteUser = async (id) => {
  await userRepo.deleteUserById(id)
};

export const adminDeleteMonster = async (id) => {
  await userRepo.deleteMonsterById(id)
};