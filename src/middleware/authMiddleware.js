import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  // Jika tidak memiliki token maka akan di anggap sebagai user unauthenticated dan tidak dapat meng-akses fitur AOI
  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.sendStatus(403)
    req.user = user
    next()
  })
}