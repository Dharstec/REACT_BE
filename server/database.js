const Pool = require('pg').Pool;

const dotenv = require("dotenv");
dotenv.config({ path: './config.env' })

const pool = new Pool({
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
})
module.exports = pool;