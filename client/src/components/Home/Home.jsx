import {React, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { 
    getVideoGames,
    getGenres,
    filterGamesByGenres,
    filterDBGames,
    orderByAlphabet,
    orderByRating,

} from '../../actions';
import Pagination from './Pagination/Pagination';
import CardGame from '../CardGame/CardGame';
import NavBar from '../Nav/NavBar';
import Page404 from '../NotFound/NotFound';
import '../Home/Home.css'

const Home = () => {
    const [Order, setOrder] = useState("")
    const [loader, setLoader] = useState(false); 
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setgamesPerPage] = useState(15);
    const lastGameIndex = currentPage * gamesPerPage;
    const firstGameIndex= lastGameIndex - gamesPerPage;
    const { gamescopy, genres} = useSelector((store) => store);
    const currentGame= gamescopy.slice(firstGameIndex, lastGameIndex);

  
    const pageHandler= (page)=>{
        setCurrentPage(page);
    }
    const setPageOne=()=>{
        setCurrentPage(1)
    }
  
    const nextPage=()=>{
        if(currentPage < Math.ceil(gamescopy.length/ gamesPerPage)){
            setCurrentPage(currentPage + 1);
        }
        console.log(currentPage)
    }
    const prevPage=()=>{
        if(currentPage - 1 !==0){
            setCurrentPage(currentPage - 1);
        }
    }
    useEffect(()=>{
      dispatch(getVideoGames());
      dispatch(getGenres());
    },[dispatch]);

    const HandleReload = () => {
        window.location.reload();
      };

    const HandleFilterDB= (e)=>{
        e.preventDefault();
        dispatch(filterDBGames(e.target.value));
        setCurrentPage(1);
    };

    const HandleFilterByGenres=(e)=>{
        e.preventDefault();
        dispatch(filterGamesByGenres(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    };
    const HandleOrderName=(e)=>{
        e.preventDefault();
        dispatch(orderByAlphabet(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    };
    const HandleOrderRating=(e)=>{
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    };
    
    return(
        <div>
            <div onChange={()=>{setPageOne()}}><NavBar/></div>
         <div >
           <h1>Video Games APP</h1>
           <div className='container-filters'>
                <button className='Refresh' onClick={HandleReload}>
                    Refresh
                </button>
           </div>
            <div className='container-filters'>
          <select className="select" onChange={(e)=>{HandleOrderName(e)}} >
          <optgroup className="optionGroup" label="Alphabetic">
                    <option className="option" value="A-Z">A - Z</option>
                    <option className="option" value="Z-A">Z - A</option>
            </optgroup>  
          </select>
            </div>
          <div className='container-filters'>
             <select  onChange={(e) => {HandleFilterByGenres(e)}}>
            <option  hidden>
              Genres
            </option>
            {genres.map((el) => {
              return (
                <option key={genres.indexOf(el)} className="option" value={el.name}>
                {el.name}
                </option>
              );
            })}
          </select> 
          </div>
          
            <div className='container-filters'>
                <select onChange={(e)=>{HandleOrderRating(e)}}>
                    <option hidden>Rating</option>
                    <option value='Max-Min'>Max - Min</option>
                    <option value='Min-Max'>Min - Max</option>
                </select>
            </div>
            <div className='container-filters'>
                <select onChange={e=>{HandleFilterDB(e)}}>
                    <option value='All'>All</option>
                    <option value='DB'>Games Added</option>
                    <option value='API'>Existent</option>
                </select>
            </div>
            <div className='Pag-div'>
                <button onClick={prevPage}>PREV</button>
                <Pagination 
                gamesPerPage={gamesPerPage}
                gamesTotal={gamescopy.length}
                onSetPage={pageHandler}
                />
                <button onClick={nextPage}>NEXT</button>
            </div>
            <div>
                <div className='container'>
                 { currentGame.length > 0 && !loader ? (
                        currentGame.map((e) => {
                     return (
                        <CardGame
                        key={currentGame.indexOf(e)}
                        id={e.id}
                        name={e.name}
                        background_image={e.background_image}
                        genres={e.genres}
                        rating={e.rating}/>
                    )})
                 ) : (<div className="loading"></div>)} 
                </div>

            </div>

            <div className='Pag-div'>
                <Pagination 
                gamesPerPage={gamesPerPage}
                gamesTotal={gamescopy.length}
                onSetPage={pageHandler}
                />
            </div>
        </div>   


        </div>
    )
};

export default Home;