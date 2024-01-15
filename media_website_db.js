'use strict'

const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'admin',
  database: 'media_website_db'

})

async function insertData () {
  await client.connect()

  const text = 'INSERT INTO files(file_name, comment, username, save_directory) VALUES( )'
  const values = ['file_']
}
