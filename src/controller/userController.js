import { getAllUsers } from '../services/userService.js'

export const getUser = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users' })
  }
}