import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CharacterCreate from './components/CharacterCreate/CharacterCreate';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path= '/' element= { <LandingPage/> }/>
        <Route path='/home' element={ <Home/> }/>
        <Route path='/character' element={ <CharacterCreate/>} />
        <Route path='/home/:id' element={ <Detail/> } />
        {/* <Route path='/home/*' element={ <PageError/> } /> */}
        {/* <Route path='*' element={ <PageError/> } /> */}
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
