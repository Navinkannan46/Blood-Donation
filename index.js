require('dotenv').config()
const express = require('express')
const cors = require('cors')
const route = require('./routes/route')
const app = express()
require('./dbConnection/connection')

app.use(cors())
app.use(express.json())

const PORT = 3000 || process.env.PORT
app.use(route)
app.listen(PORT, () => {
    console.log("running");
})

