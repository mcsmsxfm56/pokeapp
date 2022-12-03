const { Router } = require('express')
const router = Router()
const { Type, Pokemon } = require('../db.js')
const axios = require('axios')

router.get('/', async (req, res) => {
    let { name } = req.query
    if(name){
        res.status(200).send(`GET /pokemons?name=${name} status 200`)
    } else {
        res.status(200).send(`GET /pokemons status 200`)
    }
})

router.get('/:id', (req, res) => {
    let { id } = req.params
    res.status(200).send(`GET /pokemons/${id} status 200`)
})

router.post('/', async (req, res) => {
    let { name, hp, attack, defense, speed, height, weight, types } = req.body
    let pokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight
    })

    types.forEach(async type => {
        let selectType = await Type.findAll({ where: { name: type } })
        pokemon.addType(selectType)
    })
    res.status(200).send('Pokemon creado con exito')
})

module.exports = router