import './App.css'
import '../src/Components/Navbar/Navbar.css'
import Start from './Components/Start/Start'
import Recipes from './Components/Recipes/Recipes';
import Favorites from './Components/Favorites/Favorites';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [userPreferences, setUserPreferences] = useState(null);
  const [favorites, setFavorites] = useState([]);

  return (
    <Router>
      <div className='app-container'>
        <Routes>
          <Route path='/' element={<Start setUserPreferences={setUserPreferences} />} />
          <Route path='/recipes' element={<Recipes userPreferences={userPreferences} favorites={favorites} setFavorites={setFavorites} />} />
          <Route path='/favorites' element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
        </Routes>
        <div className="navbar">
          <nav>
            <Link to='/'><i className="fa-regular fa-user"></i></Link>
            <Link to='/recipes'><i className="fa-regular fa-pen-to-square"></i></Link>
            <Link to='/favorites'><i className="fa-regular fa-star"></i></Link>
          </nav>
        </div>
      </div>
    </Router>
  );
}

export default App
