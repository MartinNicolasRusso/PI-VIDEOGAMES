const express = require('express');
const  videogamesRouter  = require('./videogames');
const genresRouter = require ('./genres');

const router = express.Router();

router.use('/videogames', videogamesRouter);

router.use('/genres', genresRouter);

module.exports =  router;