const express=require('express');

const { getGenres } = require('../controllers/genres');

const genresRouter = express.Router();



genresRouter.get('/', getGenres)


module.exports=genresRouter;