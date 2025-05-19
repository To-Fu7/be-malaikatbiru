import { login, register } from '../services/userService.js'


export const userLogin = async (req, res) => {
  try {
    const { token } = await login(req.body)
    res.json({ token })
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message })
  }
}

export const userRegister = async (req, res) => {
  try {
    await register(req.body)
    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message })
  }
}
