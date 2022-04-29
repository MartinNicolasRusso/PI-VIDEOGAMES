const axios = require('axios');
const { Videogame, Genres} = require ('../db');
const { API_KEY } = process.env;


const getApiInfo = async () => {
    try {
      const games = [];
      let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
      for (let i = 1; i < 15; i++) {
        let pages = await axios.get(url);
        pages.data?.results.forEach((e) => {
          games.push({
            id: e.id,
            name: e.name,
            background_image: e.background_image,
            rating: e.rating,
            genres: e.genres.map((gender) => gender.name),
            platforms: e.platforms.map((platform) => platform.platform.name),
          });
        });
         url = pages.data.next;
      }
      return games;
    } catch (error) {
      console.log(error);
    }
};

  
const getDbInfo = async () => {
    try{
      let dbData = await Videogame.findAll({
        include: {
          model: Genres,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
   
      let newdatagame = dbData.map((e) => {
        return {
          id: e.id,
          name: e.name,
          rating: e.rating,
          background_image: e.background_image,
          genres: e.genres.map((e) => e.name),
          description: e.description,
          released: e.released,
          createdVideoGame: e.createdVideoGame,
          plataforms: e.plataforms,
        };
      });
      return newdatagame;
   
   
    }catch (error){
      console.log(error);
    }
};

const getAllGames = async () => {
      const apiInfo = await getApiInfo();
      const dbInfo = await getDbInfo();
      const totalInfo = apiInfo.concat(dbInfo);
      return totalInfo
};
  
const getOneGame = async (id) => {
    try {
      let game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      const gameId = {
        id: game.data.id,
        name: game.data.name,
        background_image: game.data.background_image,
        rating: game.data.rating,
        genres: game.data.genres.map((gender) => gender.name),
        platforms: game.data.platforms.map((platform) => platform.platform.name),
      }
      return gameId
    }catch (error){
          console.log(error);
        }
};

const getGamesGenres = async () => {
    try {
     const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
     const genres = genresApi.data.results.map((g) => {
       return {name: g.name}
      });

     let getAllGenres = await Genres.findAll();
     if(getAllGenres.length === 0 ){
       await Genres.bulkCreate(genres);
     }
    
    }catch (error){
      console.log(error);
    };
};

const getDbGenres = async () => {
    try {
      let genresDb = await Genres.findAll();
      genresDb = genresDb.map((g)=> g.toJSON());
      return genresDb;
    } catch (error){
      console.log(error);
    }
};



module.exports={
    getApiInfo,
    getDbInfo,
    getAllGames,
    getOneGame,
    getGamesGenres,
    getDbGenres,
};