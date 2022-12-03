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

router.get('/:id', async (req, res) => {
    let { id } = req.params
    try {
        let bdSearch = await Pokemon.findOne({ where: { id } })
        res.status(200).send(bdSearch)
    } catch {
        try {
            let apiRequest = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            let poke = {
                image: apiRequest.data.sprites.front_default,
                name: apiRequest.data.name,
                types: apiRequest.data.types.map(obj => obj.type.name),
                id: apiRequest.data.id,
                hp: apiRequest.data.stats[0].base_stat,
                attack: apiRequest.data.stats[1].base_stat,
                defense: apiRequest.data.stats[2].base_stat,
                speed: apiRequest.data.stats[5].base_stat,
                height: apiRequest.data.height,
                weight: apiRequest.data.weight
            }
            res.status(200).send(poke)
        } catch(error){
            res.status(404).send(error.message)
        }
    }
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