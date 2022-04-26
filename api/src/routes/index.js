const express = require('express')
const  videogamesRouter  = require('./videogames');

const router = express.Router()

router.use('/videogames', videogamesRouter)

module.exports =  router;