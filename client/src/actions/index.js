import axios from "axios";



export function getVideoGames() {
  return async function (dispatch) {
    var games = await axios.get(`http://localhost:3001/videogames`);
    return dispatch({
      type: 'GET_VIDEOGAMES',
      payload: games.data,
    });
  };
}

export function getGameByName(name) {
  return async function (dispatch) {
    try {
      let gameName = await axios.get(`http://localhost:3001/videogames?name=${name}`);
      return dispatch({
        type: 'SEARCH_BY_NAME',
        payload: gameName.data, 
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getGameById(id) {
  return async function (dispatch) {
    try {
      let gameId = await axios.get('http://localhost:3001/videogames/'+ id);
      return dispatch({
        type: 'SEARCH_BY_ID',
        payload: gameId.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getGenres() {
  return async function (dispatch) {
    try {
      let allGenres = await axios.get(`http://localhost:3001/genres`);
      return dispatch({
        type: 'GET_GENRES',
        payload: allGenres.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function createGame(payload) {
  return async function () {
    const info = await axios.post(`http://localhost:3001/videogames`, payload);
    return {info};
  };
}

export const deleteGame = (id) => {
  return async function(dispatch){
      try{
          await axios.delete(`http://localhost:3001/videogames/${id}`)
          return dispatch({
              type: 'DELETE_GAME',
          })
      }catch(error){
         console.log(error)
      }
  }
}

export const updateGame = (id, data) => {
  return async function(dispatch){
      try{
          await axios.put(`http://localhost:3001/videogames/${id}`, data);
          return dispatch({
              type: 'UPDATE_GAME'
          })
      }catch(error){
          console.log(error);
      }
  }
}

export function filterGamesByGenres(payload) {
  return {
    type: 'FILTER_BY_GENRES',
    payload,
  };
}

export function filterDBGames(payload) {
  return {
    type: 'FILTER_DB_GAMES',
    payload,
  };
}

export function orderByAlphabet(payload) {
  return {
    type: 'ORDER_BY_ALPHABET',
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: 'ORDER_BY_RATING',
    payload,
  };
}
 export function resetDetailPage() {
   return {
     type: 'CLEAR_STATE',
   };
 }

