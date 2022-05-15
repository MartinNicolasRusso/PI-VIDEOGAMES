const { Videogame, Genres} = require ('../db');
const { getDbInfo,getAllGames,getOneGame} = require('./utils');
const axios = require ('axios')


const getVideogame = async (req,res) => {
    try {
        const {name} = req.query;
        let videogames = await getAllGames();
        if(name){
            let videogame = await videogames.filter(e=>e.name.toLowerCase().includes(name.toLowerCase()))
            .slice(0, 16);
            videogame.length ?
            res.status(200).send(videogame) :
            res.status(404).send('Video game not found.');
        } else{
            res.status(200).send(videogames);
        }
        
    } catch (error) {
        res.status(400).send({errorMsg: error});
    }
};

const getGamebyId = async (req,res) => {
        try {
        const { id } = req.params;
        if (id.length > 7 && typeof id === "string") {
                (id)
                let dbGame = await getDbInfo();
                let gameId = await dbGame.filter((e)=>e.id === id);
            res.status(200).send(gameId);
        }else {
            ('2')
                 const gameId = await getOneGame(id);
                return gameId
                ? res.status(200).send(gameId) :
                res.status(400).send('Video game not found')
            }
        } catch (error) {
            console.log(error)
            res.status(400).send('Video game not found')
    }
};

const postVideogame = async (req,res) => {
     try {
         const {
            name,
            background_image,
            description,
            released,
            rating,
            genres,
            platforms,
            createdVideoGame,
        }= req.body;
        if (!name || !description || !platforms || !genres) {
            res.status(400).send('Missing data')
        }
        let newGame = await Videogame?.create({
            name,
            background_image:
            background_image ||
            "https://www.fundaciontelefonica.uy/wp-content/uploads/2020/09/Dise%C3%B1o-de-videojuegos-Hero.png",
            description,
            released,
            rating,
            platforms,
            createdVideoGame,
        })
        genres.forEach(async (e) => {
            let genreDb = await Genres.findAll({
                where:{
                    name: e
             }
            })
         await newGame.addGenres(genreDb);
        })
        res.status(200).json(newGame);
    } catch (error) {
        console.log(error)
        res.status(400).send({errorMsg: error});
    };
};

const deleteGame = async (req,res) => {
    try {
        const { id } = req.params;
        const gamedelete= await Videogame.findByPk(id);
        if(gamedelete){
            await gamedelete.destroy();
            return res.status(200).send('Video Game was delete')
        }
        res.status(400).send('Video Game not found');
    } catch(error) {
        console.log(error)
    }
};

const putGame = async (req,res) => {
    try {
        const {id} = req.params;
        const gameupdid = await Videogame.findOne({
            where:{
                id: id,
            }
        });
        await gameupdid.update({
            name: req.body.name,
            rating: req.body.rating,
            released: req.body.released,
            description: req.body.description,
            platforms: req.body.platforms,
        });
        req.body.genres.forEach(async (e)=>{
            let genreDb = await Genres.findAll({
                where: {
                    name: e,
                }
            });
            await gameupdid.setGenres(genreDb)
        });
        res.status(200).send(gameupdid);
    } catch (error) {
        console.log(error)
    }
};
 

module.exports= {
    getVideogame,
    getGamebyId,
    postVideogame,
    putGame,
    deleteGame,
};