const mysql = require('mysql')

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'e-commerce'
})

conn.connect()

module.exports = conn