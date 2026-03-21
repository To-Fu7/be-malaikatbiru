import pool from "../database/db.js"

export const findRegisteredUser = async (username) => {
  const res = await pool.query('SELECT * FROM users WHERE username = $1', [username])
  return res.rows[0]
}


export const findUserById = async (id) => {
  const res = await pool.query('SELECT * FROM users WHERE id = $1', [id])
  return res.rows[0]
}

export const createUser = async (user) => {
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
    ON CONFLICT (id) DO NOTHING
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

export const createNewMonster = async (monster)=> {
  const {
    monster_name,
    monster_type,
    monster_element,
    monster_attributes,
    monster_loc,
    monster_drops,
    monster_pic, // will be changed to monster_img
  } = monster

  const result = await pool.query(
    `INSERT INTO monsters
    (monster_name, monster_type, monster_element, monster_attributes, monster_loc, monster_drops, monster_pic)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [
      monster_name,
      monster_type,
      monster_element,
      JSON.stringify(monster_attributes),
      monster_loc,
      JSON.stringify(monster_drops),
      monster_pic
    ]
  )
  return result.rows[0]
}

export const findAll = async ()=> {
  const result = await pool.query('SELECT * FROM users')
  return result.rows
}
export const getAllMonsters = async () => {
  const res = await pool.query('SELECT * FROM monsters')
  return res.rows
}

export const getAllItems = async () => {
  const res = await pool.query('SELECT * FROM items')
  return res.rows
}

export const updateUserById = async (id, { name, position, status }) => {
  const result = await pool.query(
    `UPDATE users SET name = COALESCE($1, name), position = COALESCE($2, position), status = COALESCE($3, status) WHERE id = $4 RETURNING *`,
    [name ?? null, position ?? null, status ?? null, id]
  )
  return result.rows[0]
}

export const deleteUserById = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id])
}

export const deleteMonsterById = async (id) => {
  await pool.query('DELETE FROM monsters WHERE id = $1', [id])
}

export const updateMonsterById = async (id, { monster_name, monster_type, monster_element, monster_loc, monster_attributes, monster_drops, monster_pic }) => {
  const result = await pool.query(
    `UPDATE monsters SET
      monster_name      = COALESCE($1, monster_name),
      monster_type      = COALESCE($2, monster_type),
      monster_element   = COALESCE($3, monster_element),
      monster_loc       = COALESCE($4, monster_loc),
      monster_attributes= COALESCE($5, monster_attributes),
      monster_drops     = COALESCE($6, monster_drops),
      monster_pic       = COALESCE($7, monster_pic)
    WHERE id = $8 RETURNING *`,
    [
      monster_name    ?? null,
      monster_type    ?? null,
      monster_element ?? null,
      monster_loc     ?? null,
      monster_attributes ? JSON.stringify(monster_attributes) : null,
      monster_drops      ? JSON.stringify(monster_drops)      : null,
      monster_pic     ?? null,
      id
    ]
  )
  return result.rows[0]
}

export const deleteItemById = async (id) => {
  await pool.query('DELETE FROM items WHERE id = $1', [id])
}