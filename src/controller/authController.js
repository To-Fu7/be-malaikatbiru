import { login, register } from '../services/userService.js'


// Controller login dari Service loginUser
export const userLogin = async (req, res) => {
  try {
    // - Get Token From auth userServices.js in [return (token)]
    const { token } = await login(req.body)
    res.json({ token })
  } catch (err) {
    // - Get error from err.status, jika err.status == null maka return code 500 as messege error
    res.status(err.status || 500).json({ message: err.message })
  }
}

// COntroller Register dari Service regUser
export const userRegister = async (req, res) => {
  try {
    await register(req.body)
    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message })
  }
}
