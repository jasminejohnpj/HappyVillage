require('dotenv').config()
const express = require('express')
const core = require('cors')
const app = express();
app.use(core())
app.use(express.json());

app.get("/show" , (req, res) => {
    console.log("connected");
    res.send("success");
 })
app.use('/api/v1',require('./routes/routing'))

module.exports = app
