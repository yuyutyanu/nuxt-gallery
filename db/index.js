const mysql = require('mysql')
require('dotenv').config()
const c = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

c.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }

  console.log('connected as id ' + c.threadId)
})

module.exports = c
