import React, { Fragment } from "react";
import "./Pagination.css";

const Pagination = ({gamesPerPage,gamesTotal,onSetPage}) => {
    const pages= [];
    for(let i = 1 ; i <= Math.ceil(gamesTotal/ gamesPerPage); i++){
        pages.push(i);
    }
      const handleClick= (e) => {
         for(let page of pages){
             if( page === parseInt(e.target.value)){
                 document.getElementById(page);
             }else {
                 document.getElementById(page);
             }
         }
         onSetPage(e.target.value);
     };
     return(
        <Fragment>
          {pages && 
         pages.map((page)=>{
             return (
                 <button  
                 id={page}
                 value={page}
                 className='btn-class'
                 key={page}
                 onClick={handleClick}>
                 {page}
                 </button>
          );
         })} 
        </Fragment>
 );
};


export default Pagination
