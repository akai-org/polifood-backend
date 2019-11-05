require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const indexRouter = require('./routes/')
const app = express()

mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+'/'+process.env.DB_NAME+'?retryWrites=true&w=majority', { useNewUrlParser: true })
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', indexRouter)

module.exports = app
