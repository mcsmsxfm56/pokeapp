const express = require('express')
const server = express()
require('dotenv').config()
const { PORT } = process.env
const { sequelize } = require('./db.js')
const morgan = require('morgan')
const pokemons = require('./routes/pokemons.js')
const types = require('./routes/types.js')

sequelize.sync({force: true}).then(() => {
    server.listen(PORT, () => {
        console.log(`Running on port ${PORT}`)
    })
})

server.use(express.json())
server.use(morgan('dev'))
server.use('/pokemons', pokemons)
server.use('/types', types)