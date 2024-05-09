const express = require("express");
const router = express.Router();
const cors = require('cors');
const app = express();
app.use(cors())

app.use('/user',require('../controller/User'));
app.use('/dropdown' , require('../controller/dropdown'));


module.exports = app;
