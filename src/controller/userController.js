import { getAllUsers, getUserById, getAllMonsters, addNewMonster, getAllItems, adminGetAllUsers, adminUpdateUser, adminDeleteUser, adminDeleteMonster, adminUpdateMonster, adminDeleteItem } from '../services/userService.js'

export const getUser = async (req, res) => {
  try {q
    const users = await getAllUsers()
    res.json(users)
  } catch (error) {
    console.error(' ERROR When Getting User :', error) // Tambahkan ini
    res.status(500).json({ message: 'Error dalam mengambil data users' })
  }
}

export const getMonsterLists = async (req, res) => {
  try {
    const monsters = await getAllMonsters()
    res.json(monsters)
  } catch (error) {
    console.error(' ERROR When Getting Monsters list :', error)
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
    console.log('Monster Data :', req.body)
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
      return res.status(400).json({ message: 'All Fields Are Required / Semua Input Wajib Di Isi' })
    }

    const newMonster = await addNewMonster(req.body)
    res.status(201).json(newMonster)
  } catch (error) {
    console.error('ERROR When Adding New Monster :', error)
    res.status(500).json({ message: error.message })
  }
}

export const getItemlists = async (req, res) => {
  try {
    const items = await getAllItems()
    res.json(items)
  } catch (error) {
    console.error('ERROR When Getting Item lists :', error)
    res.status(500).json({ message: 'Error dalam mengambil data items' })
  }
}

export const adminGetUsers = async (req, res) => {
  try {
    const users = await adminGetAllUsers()
    res.json(users)
  } catch (error) {
    console.error('ERROR Admin Get Users :', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const adminPatchUser = async (req, res) => {
  try {
    const updated = await adminUpdateUser(req.params.id, req.body)
    if (!updated) return res.status(404).json({ message: 'User not found' })
    res.json(updated)
  } catch (error) {
    console.error('ERROR Admin Update User :', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const adminRemoveUser = async (req, res) => {
  try {
    await adminDeleteUser(req.params.id)
    res.json({ message: 'User deleted' })
  } catch (error) {
    console.error('ERROR Admin Delete User :', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const adminRemoveMonster = async (req, res) => {
  try {
    await adminDeleteMonster(req.params.id)
    res.json({ message: 'Monster deleted' })
  } catch (error) {
    console.error('ERROR Admin Delete Monster :', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const adminPatchMonster = async (req, res) => {
  try {
    const updated = await adminUpdateMonster(req.params.id, req.body)
    if (!updated) return res.status(404).json({ message: 'Monster not found' })
    res.json(updated)
  } catch (error) {
    console.error('ERROR Admin Update Monster :', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const adminRemoveItem = async (req, res) => {
  try {
    await adminDeleteItem(req.params.id)
    res.json({ message: 'Item deleted' })
  } catch (error) {
    console.error('ERROR Admin Delete Item :', error)
    res.status(500).json({ message: 'Server error' })
  }
}