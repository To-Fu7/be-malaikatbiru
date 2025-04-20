// database/db.js
import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Pool } = pkg

const pool = new Pool({
  // host: process.env.DB_HOST,
  host: process.env.DB_HOST_RAIL,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

export default pool
