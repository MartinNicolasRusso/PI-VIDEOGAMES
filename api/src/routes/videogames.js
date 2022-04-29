const express = require ('express');

const { getVideogame, getGamebyId, postVideogame, deleteGame, putGame, } = require ('../controllers/Videogames');

const videogamesRouter = express.Router();



videogamesRouter.get('/', getVideogame);


videogamesRouter.get('/:id', getGamebyId);


videogamesRouter.post('/', postVideogame);


videogamesRouter.delete('/:id', deleteGame);


videogamesRouter.put('/:id', putGame)



module.exports = videogamesRouter;