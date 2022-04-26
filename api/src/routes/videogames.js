const express = require ('express');

const { getVideogame } = require ('../controllers/Videogames');

const videogamesRouter = express.Router();


videogamesRouter.get('/', getVideogame);














module.exports = videogamesRouter;