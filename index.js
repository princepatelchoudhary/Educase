const mysql = require('mysql2');
const express = require('express');
const connection = require('./config/database');

const app = express();
app.use(express.json());

const route = require("./routes/route")

app.use("/api/v1/",route);

app.listen(3000, () => {
    console.log(`Server started successfully at 3000`);
});
