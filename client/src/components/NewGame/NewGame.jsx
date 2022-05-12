import React,{useState,useEffect} from "react";
import { Link, useParams} from "react-router-dom";
import { createGame, getGenres, updateGame, getGameById} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import '../NewGame/NewGame.css'

export default function GameCreate(){
    const dispatch= useDispatch();
    let {id}= useParams()
    const genres= useSelector(( state)=> state.genres)
    const gameupdate = useSelector((state)=> state.gamescopy)
    const [updated, setUpdated] = useState(false) 
    const [validator, setValidator] = useState('')

    const[input, setInput]= useState({
    name:'',
    description:'',
    rating:'',
    released:'',
    background_image: "",
    platforms: [],
    genres: [],
    })
    

    useEffect(()=>{
        dispatch(getGenres());
        id && dispatch(getGameById(id))
    },[dispatch, id]);

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        
    }
    // function handleRating(e){

    //     setInput({
    //         ...input,
    //         rating: parseInt(e.target.value)
    //     })
    // }
    function handleGenres(e){
         setInput({
            ...input,
            genres:  input.genres.includes(e.target.value) ?  input.genres.filter(el => el !== e.target.value) 
            :  input.genres.concat(e.target.value)
        })
    }
    function handlePlatforms(e){
        setInput({
             ...input,
             platforms: input.platforms.includes(e.target.value) ? input.platforms.filter(el => el !== e.target.value) 
             : input.platforms.concat(e.target.value)
         })
         console.log(input)
    }
    const handleInput= (e)=>{
        e.preventDefault();
    if (!input.name || input.name.length < 2) {
        setValidator("The name of the game must contain at least 3 characters ");
    } else if (!input.description ) {
        setValidator("Description is required");
    } else if (!input.released) {
        setValidator("Date released is required");
    } else if (
        !input.rating && ( input.rating < 6 || input.rating > 0 )
    ) {
        setValidator("Rating must be between 1 and 5");
    } else if (input.platforms.length === 0) {
        setValidator("Select at least 1 platform");
    } else if (input.genres.length === 0) {
      setValidator("Select at least 1 genre");
    } else {
        if(input.name){
            if(!id){
                dispatch(createGame(input));
                alert("Video Game created Succesfully");
            } else{
                dispatch(updateGame(id, input))
                alert('Game modified successfully');
            }
      }
      setValidator("");
      setInput({
        name: "",
        description: "",
        released: "",
        rating: "",
        background_image: "",
        platforms: [],
        genres: [],
      });
      
    }
  }

  if(id && gameupdate.name && !updated) {
    setInput ({
        ...input,
        name: gameupdate.name,
        description: gameupdate.description,
        released: gameupdate.released,
        rating: gameupdate.rating,
        platforms: gameupdate.platforms,
        background_image: gameupdate.background_image,
        genres: gameupdate.genres,
    })
    setInput(!updated)
};



    return(
        <div className="Backgroundd">
            <Link to='/home'><button>Back</button></Link> 
            <div className="container-all">
            {id ? (
                <div>
                    <h1>Update your Game!</h1>
                </div>
            ):(

            <div className="div-title">
                <h1>Create VideoGame!</h1>
            </div>
            )}

            
            {validator && <div className="validator">{validator}</div>}
            <form onSubmit={(e)=>handleInput(e)}>
                <div className="div-name">
                    <label>Name:</label>
                    <input
                    type= 'text'
                    value={input.name}
                    name= 'name'
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="div-rating">
                    <label>Rating:</label>
                    <input
                    type="number"
                    max="5"
                    min="1"
                    placeholder="Game Rate"
                    name="rating"
                    value={input.rating}
                    onChange={(e)=>handleChange(e)}/>
                </div>
                <div className="div-released">
                    <label>Released:</label>
                    <input
                    type='date'
                    value={input.released}
                    name='released'
                    onChange={(e)=>handleChange(e)}/>
                </div>
                <div className="div-img">
                    <label>Image Url:</label>
                    <input
                    type='text'
                    value={input.background_image}
                    name='background_image'
                    onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label className="gen">Genres: </label>
                    <div className="div-genres">
                    {genres.map((e) => (
                    <div key={e.name}>
                    <input
                        type="checkbox"
                        onClick={(e) => handleGenres(e)}
                        value={e.name}
                        name="genres"
                        key={e}/>
                    {e.name}
                    </div>
                    ))}
                    </div>
                </div>
                        <label className="plat">Platforms: </label>
                    <div className="div-platforms" >
                        <input value="PS4" type="checkbox" name="platform" onChange={(e)=>handlePlatforms(e)}/><label>PS4</label>
                        <input value="PS5" type="checkbox" name="platform" onChange={(e)=>handlePlatforms(e)}/><label>PS5</label>
                        <input value="PC" type="checkbox" name="platform" onChange={(e)=>handlePlatforms(e)}/><label>PC</label>
                        <input value="SEGA" type="checkbox" name="platform" onChange={(e)=>handlePlatforms(e)}/><label>SEGA</label>
                        <input value="NINTENDO 64" type="checkbox" name="platform" onChange={(e)=>handlePlatforms(e)}/><label>NINTENDO 64</label>
                        <input value="NINTENDO SWITCH"type="checkbox" name="platform" onChange={(e)=>handlePlatforms(e)}/><label>NINTENDO SWITCH</label>
                        <input value="ATARI" type="checkbox" name="platform" onChange={(e)=>handlePlatforms(e)}/><label>ATARI</label>
                        <input value="XBOX ONE"type="checkbox" name="platform" onChange={(e)=>handlePlatforms(e)}/><label>XBOX ONE</label>
                        <input value="XBOX X" type="checkbox" name="platform" onChange={(e)=>handlePlatforms(e)}/><label>XBOX X</label>
                        <input value="GAME BOY ADVANCED" type="checkbox" name="platform" onChange={(e)=>handlePlatforms(e)}/><label>GAME BOY ADVANCED</label>
                        <input value="IOS" type="checkbox" name="platform" onChange={(e)=>handlePlatforms(e)}/><label>IOS</label>
                        <input value="LINUX" type="checkbox" name="platform" onChange={(e)=>handlePlatforms(e)}/><label>LINUX</label>
                        <input value="ANDROID" type="checkbox" name="platform" onChange={(e)=>handlePlatforms(e)}/><label>ANDROID</label>
                        <input value="WEB" type="checkbox" name="platform" onChange={(e)=>handlePlatforms(e)}/><label>WEB</label>
                        <input value="PLAYSTATION" type="checkbox" name="platform" onChange={(e)=>handlePlatforms(e)}/><label>PLAYSTATION</label>
                    </div>
                <div className="div-description">
                    <label>Description:</label>
                    <div>
                    <textarea
                    type='text'
                    value={input.description}
                    name='description'
                    cols='40'
                    rows='6'
                    onChange={(e)=>handleChange(e)}/>  
                    </div>
                </div>
                    <button  type='submit' className='button'>Create Game</button>
            </form>
        
                </div>
        </div>
        
    )

}