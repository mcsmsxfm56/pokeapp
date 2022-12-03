const express = require('express')
const server = express()
require('dotenv').config()
const { PORT } = process.env
const { sequelize } = require('./db.js')

sequelize.sync({force: true}).then(() => {
    server.listen(PORT, () => {
        console.log(`Running on port ${PORT}`)
    })
})