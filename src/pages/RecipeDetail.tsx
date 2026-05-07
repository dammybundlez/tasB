import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import {
  Heart,
  Globe,
  Users,
  Clock,
  ChefHat,
  Star,
  Link2,
  ArrowRight,
  Flame,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { useFavorites } from '../context/FavContext'
import SimilarItem from '../components/SimilarItem'

interface Recipe {
  id: number
  title: string
  image: string
  summary: string
  instructions: string
  servings: number
  preparationMinutes: number
  cookingMinutes: number
  readyInMinutes: number
  spoonacularScore: number
  cuisines: string[]
  dishTypes: string[]
  extendedIngredients: {
    id: number
    name: string
    amount: number
    unit: string
  }[]
  analyzedInstructions: {
    steps: {
      number: number
      step: string
    }[]
  }[]
  sourceUrl: string
}

interface Nutrition {
  calories: string
  protein: string
  carbs: string
  fat: string
}

const API_KEY =  '93e68c41440948eb9b00e79f8e8fa67b'

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [nutrition, setNutrition] = useState<Nutrition | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isFavorite, addFavorites, removeFavorites } = useFavorites()

  const fetchRecipe = useCallback(async () => {
    if (!API_KEY) {
      setError('API key not configured')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const [recipeRes, nutritionRes] = await Promise.all([
        axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: { apiKey: API_KEY },
        }),
        fetch(
          `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${API_KEY}`
        ),
      ])

      setRecipe(recipeRes.data)

      if (nutritionRes.ok) {
        const nutritionData = await nutritionRes.json()
        setNutrition(nutritionData)
      }
    } catch (err) {
      setError('Failed to load recipe. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchRecipe()
    window.scrollTo(0, 0)
  }, [fetchRecipe])

  const handleFavorite = () => {
    if (!recipe) return
    isFavorite(recipe.id) ? removeFavorites(recipe.id) : addFavorites(recipe)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          <p className="text-sm font-medium">Loading recipe...</p>
        </div>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            {error || 'Recipe not found'}
          </h2>
          <p className="text-slate-500 mb-6">
            We couldn't load this recipe. It might have been removed or the API limit was reached.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
          >
            Browse recipes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  const words = recipe.title.split(' ')
  const titleFirst = words[0] || ''
  const titleSecond = words[1] || ''
  const titleRest = words.slice(2).join(' ')

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative h-64 md:h-80 lg:h-96">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-7xl mx-auto">
          <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3">
            {recipe.cuisines[0] || 'Recipe'}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {titleFirst}{' '}
            <span className="text-amber-400">{titleSecond}</span>
            {titleRest && ` ${titleRest}`}
          </h1>
        </div>

        <button
          onClick={handleFavorite}
          className={`
            absolute top-6 right-6 p-3 rounded-full transition-all duration-200
            ${isFavorite(recipe.id)
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
              : 'bg-white/90 backdrop-blur text-slate-600 hover:bg-white'
            }
          `}
        >
          <Heart
            className={`w-5 h-5 ${isFavorite(recipe.id) ? 'fill-current' : ''}`}
          />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatItem
              icon={<Globe className="w-5 h-5" />}
              label="Cuisine"
              value={recipe.cuisines[0] || 'Various'}
            />
            <StatItem
              icon={<Users className="w-5 h-5" />}
              label="Servings"
              value={`${recipe.servings} persons`}
            />
            <StatItem
              icon={<Clock className="w-5 h-5" />}
              label="Prep Time"
              value={`${recipe.preparationMinutes || 30} min`}
            />
            <StatItem
              icon={<ChefHat className="w-5 h-5" />}
              label="Cook Time"
              value={`${recipe.cookingMinutes || 30} min`}
            />
            <StatItem
              icon={<Star className="w-5 h-5" />}
              label="Rating"
              value={recipe.spoonacularScore?.toFixed(1) || 'N/A'}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Summary */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About</h2>
              <div
                className="prose prose-slate max-w-none text-slate-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {recipe.dishTypes.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full capitalize"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </section>

            {/* Ingredients */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Ingredients
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
                {recipe.extendedIngredients?.map((ing) => (
                  <div
                    key={ing.id}
                    className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-medium text-slate-700 capitalize">
                      {ing.name}
                    </span>
                    <span className="text-sm text-slate-500 font-medium">
                      {ing.amount.toFixed(1)} {ing.unit}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Instructions */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Instructions
              </h2>

              {recipe.instructions && (
                <div
                  className="prose prose-slate max-w-none text-slate-600 mb-6 bg-white rounded-2xl border border-slate-200 p-6"
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
              )}

              {recipe.analyzedInstructions?.[0]?.steps?.length > 0 && (
                <div className="space-y-4">
                  {recipe.analyzedInstructions[0].steps.map((step) => (
                    <div
                      key={step.number}
                      className="flex gap-4 bg-white rounded-2xl border border-slate-200 p-5"
                    >
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-amber-500 text-white font-bold rounded-xl">
                        {step.number}
                      </span>
                      <p className="text-slate-600 leading-relaxed pt-2">
                        {step.step}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                Nutrition
              </h3>
              {nutrition ? (
                <div className="space-y-3">
                  <NutritionRow label="Calories" value={nutrition.calories} />
                  <NutritionRow label="Protein" value={nutrition.protein} />
                  <NutritionRow label="Carbs" value={nutrition.carbs} />
                  <NutritionRow label="Fat" value={nutrition.fat} />
                </div>
              ) : (
                <p className="text-slate-400 text-sm italic">Loading nutrition...</p>
              )}
            </div>

            {/* Source Link */}
            {recipe.sourceUrl && (
              <a
                href={recipe.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-colors group"
              >
                <span className="font-medium text-sm">View original source</span>
                <Link2 className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}

            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop"
                alt="Chef"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white/70 text-sm mb-1">Recipe by</p>
                <p className="text-white font-bold text-lg">Chef Chulu Rodriguez</p>
                <Link
                  to="/recipes"
                  className="inline-flex items-center gap-1 text-amber-400 text-sm font-medium mt-2 hover:text-amber-300"
                >
                  See all recipes <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Reviews <span className="text-amber-500">(12)</span>
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex gap-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop"
                alt="Reviewer"
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-slate-900">Angelina Nguyen</span>
                  <span className="text-slate-400 text-sm">Sep 8, 2023</span>
                </div>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= 4 ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                    />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A culinary delight that brings together perfectly seasoned ingredients
                  with a medley of fresh toppings. The simplicity makes it a go-to choice
                  for weeknight dinners.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Related <span className="text-amber-500">Recipes</span>
          </h2>
          <div className=''>
            <SimilarItem id={id!} />  
          </div>
        </section>
      </div>
    </div>
  )
}

const StatItem = ({
  icon, label, value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) => (
  <div className="flex items-center gap-3">
    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-600">
      {icon}
    </div>
    <div>
      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-900">{value}</p>
    </div>
  </div>
)

const NutritionRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
    <span className="text-sm text-slate-600">{label}</span>
    <span className="text-sm font-bold text-slate-900">{value}</span>
  </div>
)

export default RecipeDetail