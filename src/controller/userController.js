import { getAllUsers, getUserById } from '../services/userService.js'

export const getUser = async ( req, res ) => {
  try{
    const users = await getAllUsers()
    res.json(users)
  } catch(error) {
    res.status(500).json({message : 'Error dalam mengambil data users'})
  }
}

export const getProfiles = async (req, res) => {
  try {
    const user = await getUserById(req.user.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
