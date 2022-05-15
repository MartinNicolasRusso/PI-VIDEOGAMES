const initialState={
    videogames:[],
    gamescopy:[],
    genres:[],
    detail:[],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_VIDEOGAMES':
        return {
          ...state,
          videogames: action.payload,
          gamescopy: action.payload,
        };
      case 'SEARCH_BY_NAME':
        return {
          ...state,
          gamescopy: action.payload,
        };
      case 'SEARCH_BY_ID':
      return {
          ...state,
          detail: action.payload,
          
        };
        
      case 'GET_GENRES':
        return {
          ...state,
          genres: action.payload,
        };
  
      case 'CREATE_GAME':
        return {
          ...state,
        };
      case 'UPDATE_GAME':
        return{
          ...state,
        };
      case 'DELETE_GAME':
        return{
          ...state,
        };
      case 'CLEAR_STATE':
        return {
          ...state,
          detail:{},
        };
      case 'ORDER_BY_ALPHABET':
        const orderGames =
          action.payload === "A-Z"
            ? state.gamescopy.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return 1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                  return -1;
                }
                return 0;
              })
            : state.gamescopy.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return -1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                  return 1;
                }
                return 0;
              });
  
        return {
          ...state,
          gamescopy: orderGames,
        };
  
      case 'FILTER_BY_GENRES':
        let gamescopy = state.videogames;
        let filterGenre = gamescopy.filter((el) =>
          el.genres.includes(action.payload)
        );
        return {
          ...state,
          gamescopy: action.payload === "All" ? gamescopy : filterGenre,
        };
  
      case 'FILTER_DB_GAMES':
        const allGames = state.videogames;
        const filterCreatedGames =
          action.payload === "DB"
            ? allGames.filter((e) => e.createdVideoGame === true)
            : allGames.filter((e) => e.createdVideoGame !== true);
            return {
          ...state,
          gamescopy: 
          action.payload === "All" ? allGames : filterCreatedGames,
        };
  
      case 'ORDER_BY_RATING':
        const gamesRating =
          action.payload === "Min-Max" 
          ? state.gamescopy.sort((a, b) => {
            if (a.rating > b.rating) {
              return 1;
            }
            if (b.rating > a.rating) {
              return -1;
            }
              return 0;
          })
          : state.gamescopy.sort((a, b) => {
            if (a.rating > b.rating) {
              return -1;
            }
            if (b.rating > a.rating) {
              return 1;
            }
              return 0;
          });
  
        return {
          ...state,
          gamescopy: gamesRating,
        };
  
      default:
        return state;
    }
  };

export default rootReducer