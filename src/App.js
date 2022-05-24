import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/Home';
import Header from './components/Header'
import { useState } from 'react';
import axios from 'axios';
import Pokemon from './components/Pokemon'

function App() {

  const navigate = useNavigate();
  const [currentPokemon, setCurrentPokemon] = useState({});

  const fetchIndividualData = async (url) => {
    const response = await axios.get(url)
    setCurrentPokemon(response.data)
    navigate('/pokemon')
  }

  return (
    <div className="App">
      <Header />
      <Routes>

        <Route path="/" element={<Home fetch={fetchIndividualData} />} />
        <Route path="/pokemon" element={<Pokemon current={currentPokemon} />} />

      </Routes>
    </div>
  );
}

export default App;