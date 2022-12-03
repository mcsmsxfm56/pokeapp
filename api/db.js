const { Sequelize } = require('sequelize')
require('dotenv').config()
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env
const type = require('./models/Type.js')
const pokemon = require('./models/Pokemon.js')

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    logging: false
})

type(sequelize)
pokemon(sequelize)

const entries = Object.entries(sequelize.models)
const capEntries = entries.map(model => [
    model[0][0].toUpperCase() + model[0].slice(1), model[1]
])
sequelize.models = Object.fromEntries(capEntries)

const { Pokemon, Type } = sequelize.models
Pokemon.belongsToMany(Type, {through: 'pokemontypes'})
Type.belongsToMany(Pokemon, {through: 'pokemontypes'})

module.exports = {
    sequelize,
    ...sequelize.models
}