const mysql = require('mysql2');
require("dotenv").config();

const password = process.env.password;

const connection = mysql.createConnection({
    host: process.env.Host,
    port:process.env.Port,
    user: process.env.User,
    password: process.env.Password,
    database:process.env.Database,
    ssl: {  // Aiven requires SSL for connections
        rejectUnauthorized: false,
    },
});

connection.connect((err) => {
    if (err) {
        console.log("connection failed", err);
    }
    else {
        console.log("connected");
    }
});

module.exports =  connection;