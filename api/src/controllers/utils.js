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
     return await Videogame.findAll({
        include: {
          model: Genres,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
  };
  

  const getAllGames = async () => {
      const apiInfo = await getApiInfo();
      const dbInfo = await getDbInfo();
      const totalInfo = apiInfo.concat(dbInfo);
      return totalInfo
  };
  
  // const getOneGame = async () => {

  // }
  
module.exports={
    getApiInfo,
    getDbInfo,
    getAllGames,
    // getOneGame,
}