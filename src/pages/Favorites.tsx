import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavContext'
import {
  Heart,
  ArrowRight,
  Trash2,
  ChefHat,
  BookOpen,
  ExternalLink,
} from 'lucide-react'

interface FavoriteRecipe {
  id: number
  title: string
  image: string
}

const Favorites = () => {
  const { favorites, removeFavorites } = useFavorites()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">
              Your Favorites
            </h1>
          </div>
          <p className="text-slate-500">
            {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-slate-500 max-w-sm mb-8">
              Start exploring recipes and save the ones you love. Your personal cookbook awaits.
            </p>
            <Link
              to="/recipes"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors"
            >
              Browse Recipes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {favorites.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {favorites.map((recipe: FavoriteRecipe) => (
                <FavoriteCard
                  key={recipe.id}
                  recipe={recipe}
                  onRemove={() => removeFavorites(recipe.id)}
                />
              ))}
            </div>

            {favorites.length > 1 && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => {
                    if (confirm('Remove all favorites?')) {
                      favorites.forEach((r: FavoriteRecipe) => removeFavorites(r.id))
                    }
                  }}
                  className="text-sm text-slate-400 hover:text-rose-500 transition-colors"
                >
                  Remove all favorites
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const FavoriteCard = ({recipe, onRemove }: { 
  recipe: FavoriteRecipe 
  onRemove: () => void
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onRemove()
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-lg text-slate-400 hover:text-rose-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          title="Remove from favorites"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 mb-3">
          {recipe.title}
        </h3>

        <div className="flex items-center gap-2">
          <Link
            to={`/recipe/${recipe.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-900 text-white text-xs font-medium py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            View Recipe
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Favorites