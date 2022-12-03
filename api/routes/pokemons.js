const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    let { name } = req.query
    if(name){
        res.status(200).send(`GET /pokemons?name=${name} status 200`)
    } else {
        res.status(200).send('GET /pokemons status 200')
    }
})

router.get('/:id', (req, res) => {
    let { id } = req.params
    res.status(200).send(`GET /pokemons/${id} status 200`)
})

router.post('/', (req, res) => {
    res.status(200).send('POST /pokemons status 200')
})

module.exports = router