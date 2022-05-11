import React from 'react';
import {Link} from 'react-router-dom';
import '../LandingPage/LandingPage.css';


export default function LandingPage (){
    return (
        <div className='background'>
            
            <div className='box-welcome'>
                <h1 className="welcome">Welcome To My VideoGames Page!</h1>
            </div>
            <div>
                <Link to ='/Home'>
                <button className="button" ><span>PRESS START</span></button>
                </Link>
            </div>

        </div>  
       
    )
}