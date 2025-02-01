import './Favorites.css';

const Favorites = ({ favorites, setFavorites }) => {
  const handleRemoveFromFavorites = (recipeId) => {
    setFavorites(favorites.filter((recipe) => recipe.id !== recipeId));
  };

  return (
    <div className="favorites-container">
      <h2>Twoje ulubione przepisy <i className="fa-solid fa-crown" style={{color: 'yellow'}}></i></h2>
      {favorites.length === 0 ? (
        <p>Nie masz jeszcze ulubionych przepisów.</p>
      ) : (
        <div className="recipes-grid">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="generated-recipe">
              <h5>{recipe.title}</h5>
              <p className="recipe-calories">Kalorie posiłku: {recipe.calories}</p>
              <img src={recipe.image} alt={recipe.title} className="recipe-img" />
              <button className='remove-btn' onClick={() => handleRemoveFromFavorites(recipe.id)}>
                Usuń z ulubionych
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
