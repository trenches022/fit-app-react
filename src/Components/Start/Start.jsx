import '@fortawesome/fontawesome-free/css/all.min.css';
import './Start.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Start = ({ setUserPreferences }) => {

  const [budget, setBudget] = useState('');
  const [calories, setCalories] = useState('');
  const [training, setTraining] = useState('');
  const [diet, setDiet] = useState('meat');

  const navigate = useNavigate();

  const handleGenerate = () => {
    const preferences = { budget, calories, training, diet };
    setUserPreferences(preferences);
    navigate('/recipes');
  }

  return (
    <div className="start-page">
      <h2>Zgeneruj przepisy na cały tydzień jednym kliknięciem <i className="fa-solid fa-carrot" style={{color: '#ffb300'}}></i></h2>
      <div className="start-inputs">
        <input type="text" placeholder="Wpisz budżet (zł.)" value={budget} onChange={(e) => setBudget(e.target.value)} required/>
        <input type="text" placeholder="Ile kalorii?" value={calories} onChange={(e) => setCalories(e.target.value)} required/>
        <input type="text" placeholder="Ile godzin trenujesz tygodniowo?" value={training} onChange={(e) => setTraining(e.target.value)} required/>
        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value='meat'>Z mięsem</option>
          <option value='vegan'>Bez mięsa / vegan</option>
        </select>
      </div>
      <button onClick={handleGenerate} className='generate-btn'>Zgeneruj menu</button>
    </div>
  )
}

export default Start;