const { Videogame, Genres} = require ('../db');
const {Op}= require('sequelize');
const {  getApiInfo,getDbInfo,getAllGames,} = require('./utils')


const getVideogame = async (req,res)=>{
    try {
        const {name} = req.query;
        let videogames = await getAllGames();
        if(name){
            let videogame = await videogames.filter(e=>e.name.toLowerCase().includes(name.toLowerCase()));
            videogame.length ?
            res.status(200).send(videogame) :
            res.status(404).send('The Video game doesn`t exist.');
        } else{
            res.status(200).send(videogames);
        }
        
    } catch (error) {
        res.status(400).send({errorMsg: error});
    }
};

module.exports= {getVideogame,};