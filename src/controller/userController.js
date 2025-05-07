import { getAllUsers, getUserById, getAllMonsters, addNewMonster, getAllItems } from '../services/userService.js'

export const getUser = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.json(users)
  } catch (error) {
    console.error('❌ ERROR getUser:', error) // Tambahkan ini
    res.status(500).json({ message: 'Error dalam mengambil data users' })
  }
}

export const getMonsterLists = async (req, res) => {
  try {
    const monsters = await getAllMonsters()
    res.json(monsters)
  } catch (error) {
    console.error('❌ ERROR getMonsterLists:', error)
    res.status(500).json({ message: 'Error dalam mengambil data monsters' })
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

export const pushNewMonster = async (req, res) => {
  try {
    console.log('📥 Incoming Payload:', req.body) // Add this
    const {
      monster_name,
      monster_type,
      monster_element,
      monster_attributes,
      monster_loc,
      monster_drops,
      monster_pic
    } = req.body

    if (
      !monster_name || !monster_type || !monster_element ||
      !monster_attributes || !monster_loc || !monster_drops || !monster_pic
    ) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const newMonster = await addNewMonster(req.body)
    res.status(201).json(newMonster)
  } catch (error) {
    console.error('❌ ERROR addNewMonster:', error) // Catch actual error
    res.status(500).json({ message: error.message })
  }
}

export const getItemlists = async (req, res) => {
  try {
    const items = await getAllItems()
    res.json(items)
  } catch (error) {
    console.error('❌ ERROR getItemlists:', error)
    res.status(500).json({ message: 'Error dalam mengambil data items' })
  }
}