import { useEffect, useState } from "react";
import './Recipes.css';

const API_KEY = '**********************';

const Recipes = ({ userPreferences, favorites, setFavorites }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userPreferences) return;

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const dietType = userPreferences.diet === 'vegan' ? 'vegetarian' : '';
    
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=7&diet=${dietType}&maxCalories=${userPreferences.calories}`
        );
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        
        if (!data.results) {
          throw new Error("Nie znaleziono przepisów");
        }

        const recipesWithCalories = await Promise.all(
          data.results.map(async (recipe) => {
            const nutritionResponse = await fetch(
              `https://api.spoonacular.com/recipes/${recipe.id}/nutritionWidget.json?apiKey=${API_KEY}`
            );

            if (!nutritionResponse.ok) {
              return { ...recipe, calories: "Brak danych" };
            }

            const nutritionData = await nutritionResponse.json();
            return { ...recipe, calories: nutritionData.calories || "Brak danych" };
          })
        );

        setRecipes(recipesWithCalories);

      } catch (error) {
        console.error('Błąd przy ładowaniu przepisów:', error);
        setRecipes([]);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, [userPreferences]);

  const handleAddToFavorites = (recipe) => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <div className="recipes-container">
      <h2>Wybrane dla ciebie przepisy <i className="fa-solid fa-pizza-slice" style={{color: '#ff8000'}}></i></h2>
      {loading ? <p>Ładowanie...</p> : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="generated-recipe">
              <h5>{recipe.title}</h5>
              <p className="recipe-calories">Kalorie posiłku: {recipe.calories}</p>
              <img src={recipe.image} alt={recipe.title} className="recipe-img" />
              <button className='favorites-btn' onClick={() => handleAddToFavorites(recipe)}>
                Dodaj do ulubionych
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
