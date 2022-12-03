const express = require('express')
const server = express()
require('dotenv').config()
const { PORT } = process.env

server.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})