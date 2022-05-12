const express = require ('express');

const { getVideogame, getGamebyId, postVideogame, deleteGame, putGame, } = require ('../controllers/Videogames');

const videogamesRouter = express.Router();


videogamesRouter.get('/', getVideogame);

videogamesRouter.get('/:id', getGamebyId);

videogamesRouter.post('/', postVideogame);

videogamesRouter.put('/:id', putGame);

videogamesRouter.delete('/:id', deleteGame);

module.exports = videogamesRouter;