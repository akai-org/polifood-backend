const express = require("express")
const mongoose = require("mongoose")
const routes = require('../routes/')

require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

// Database

mongoose.connect(process.env.MONGODB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// Routing
app.use('/', routes)

// Listen
app.listen(port, "0.0.0.0", () =>
    console.log(`Polifood app listening on port ${port}!`)
)