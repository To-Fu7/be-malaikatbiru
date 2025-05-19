import { getAllUsers, getUserById, getAllMonsters, addNewMonster, getAllItems } from '../services/userService.js'

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