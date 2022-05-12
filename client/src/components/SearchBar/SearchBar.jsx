import { useState} from 'react'
import { useDispatch } from 'react-redux'
import { getGameByName } from '../../actions/index'



const SearchBar= ({onSearch}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
  
  function handleInput(e){
    e.preventDefault();
    setName(e.target.value)
  }
  
  function handleSubmit(e){
    e.preventDefault();
    dispatch(getGameByName(name));
    setName('');
  }
    
    return (
    <div className='search-box'>
      
      <input className='input-search'
       value={name}
       type="text" placeholder='Type to Search...'
       onChange ={(e) =>handleInput(e)}/>
  
      <button type ='submit' className='btn-search'
      onClick={(e) => handleSubmit(e)} >🔍</button>
  
    </div>
    )
  
}

export default SearchBar