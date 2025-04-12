import pool from '../database/db.js'

const getUser = async () => {
  const result = await pool.query('SELECT * FROM users')
  return result.rows
}

const createUser = async (user) => {
  const {
    name,
    position,
    buff_land,
    profile_pic,
    username,
    pass,
    uac,
    cash,
    buff_code,
    status,
    ign
  } = user

  const result = await pool.query(
    `INSERT INTO users 
    (name, position, buff_land, profile_pic, username, pass, uac, cash, buff_code, status, ign)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *`,
    [
      name,
      position,
      buff_land,
      profile_pic,
      username,
      pass,
      JSON.stringify(uac),
      cash,
      buff_code,
      status,
      ign
    ]
  )

  return result.rows[0]
}

export default {
  getUser,
  createUser
}
