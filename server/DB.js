const {createPool} = require('mysql');
require('dotenv').config()

module.exports =  pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_NAME,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
    
})