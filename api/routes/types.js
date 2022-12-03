const { Router } = require('express')
const router = Router()
const axios = require('axios')
const { Type } = require('../db.js')

router.get('/', async (req, res) => {
    let bdSearch = await Type.findAll()
    if(bdSearch.length === 0){
        let typeRequest = await axios.get('https://pokeapi.co/api/v2/type')
        let id = 0
        typeRequest = typeRequest.data.results.map(obj => {
        let objType = {
            name: obj.name,
            id: ++id
        }
        return objType
        }
        )
        typeRequest.forEach(async type => {
            await Type.create(type)
        })
        res.status(200).send(typeRequest)
    } else {
        res.status(200).send(bdSearch)
    }
})

module.exports = router