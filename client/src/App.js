import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import GameDetail from './components/GameDetail/GameDetail';
import NewGame from './components/NewGame/NewGame';
import Page404 from './components/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Home/>}/>
       <Route path='/home/:id' element={<GameDetail/>}/>
       <Route path='/create' element= {<NewGame/>}/> 
       <Route path='*' element={<Page404/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
