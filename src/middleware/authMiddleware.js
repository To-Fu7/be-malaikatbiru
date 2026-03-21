import jwt from 'jsonwebtoken'
import { findUserById } from '../repository/userRepository.js'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.sendStatus(403)
    req.user = user
    next()
  })
}

export const verifyAdmin = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await findUserById(decoded.id)
    if (!user || !['vice', 'leader', 'superadmin'].includes(user.position))
      return res.status(403).json({ message: 'Forbidden: Admin only' })
    req.user = decoded
    next()
  } catch {
    res.status(403).json({ message: 'Invalid token' })
  }
}