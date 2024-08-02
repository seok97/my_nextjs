const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
  password: process.env.MYSQL_PASS,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

module.exports = pool;