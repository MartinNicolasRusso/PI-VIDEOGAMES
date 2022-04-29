const express=require('express');

const { getGenres } = require('../controllers/genres');

const genresRouter = express.Router();



genresRouter.get('/:genres', getGenres);


module.exports=genresRouter;