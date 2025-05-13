// pages/Favorites.tsx
import { useFavorites } from "../context/FavContext";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, removeFavorites } = useFavorites();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet 😢</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="bg-white shadow p-4 rounded">
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded" />
              <h3 className="mt-2 text-lg font-semibold">{recipe.title}</h3>
              <div className="flex justify-between mt-2">
                <Link to={`/recipe/${recipe.id}`} className="text-blue-600">View</Link>
                <button
                  className="text-red-500"
                  onClick={() => removeFavorites(recipe.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
