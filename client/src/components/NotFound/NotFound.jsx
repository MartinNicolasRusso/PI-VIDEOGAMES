import React from 'react';
import '../NotFound/NotFound.css';
import {Link} from 'react-router-dom';

const Page404=()=>{
    return(
    <div className='container-404'>
        <div><p className='write-404'>Press Home to restart</p></div>
        <div className='container-btn-404'>
           <Link to='/Home'>
            <button className='btn-404'>
                <strong>HOME</strong>
            </button>
            </Link>
        </div>
    </div>
    )
}
export default Page404;