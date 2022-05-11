import React from "react";
import { Link } from "react-router-dom";
import './CardGame.css'

const CardGame = ({ id, name, background_image, genres, rating}) =>{
    return( 
        <div className="flip-card">
        <div className="flip-card-inner">
            <Link to={"/home/" + id}>
                <div className="flip-card-front">
                    <img className="image-card" src={background_image} alt='img not found' width="200px" height="250px"/>
                </div>
            </Link>
        <div className="flip-card-back">
            <Link to={"/home/" + id}>
                <h3 className="content-card">{name}</h3>
                <h3 className="content-card">Genres:</h3>{genres.map((e)=> <div className="content-card" key={genres.indexOf(e) + name}>{e}</div>)}
                <h3 className="content-card">Rating: {rating}</h3>  
            </Link>
        </div>
        </div>
    </div>
    )
}

export default CardGame;