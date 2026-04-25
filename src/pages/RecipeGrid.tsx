import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import {
  Flame,
  Salad,
  Globe,
  Clock,
  Leaf,
  Heart,
  ChefHat,
  ArrowRight,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface Recipe {
  id: number
  title: string
  image: string
  imageType: string
}

interface RecipeResponse {
  results: Recipe[]
  totalResults: number
  offset: number
  number: number
}

const API_KEY = ''
const ITEMS_PER_PAGE = 12

const CATEGORIES = [
  { label: 'All Types', icon: Flame, filter: '' },
  { label: 'Appetizers', icon: ChefHat, filter: 'appetizer' },
  { label: 'Main Course', icon: Flame, filter: 'main course' },
  { label: 'Salads', icon: Salad, filter: 'salad' },
  { label: 'Vegetarian', icon: Leaf, filter: 'vegetarian' },
  { label: 'International', icon: Globe, filter: '' },
  { label: 'Desserts', icon: Heart, filter: 'dessert' },
  { label: 'Healthy', icon: Leaf, filter: 'healthy' },
  { label: 'Quick & Easy', icon: Clock, filter: 'quick' },
]

const RecipeGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalResults, setTotalResults] = useState(0)

  const page = parseInt(searchParams.get('page') || '1', 10)
  const activeCategory = searchParams.get('category') || ''

  const fetchRecipes = useCallback(async () => {
    if (!API_KEY) {
      setError('API key not configured')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await axios.get<RecipeResponse>(
        'https://api.spoonacular.com/recipes/complexSearch',
        {
          params: {
            apiKey: API_KEY,
            number: ITEMS_PER_PAGE,
            offset: (page - 1) * ITEMS_PER_PAGE,
            type: activeCategory || undefined,
            addRecipeInformation: false,
          },
        }
      )

      setRecipes(res.data.results)
      setTotalResults(res.data.totalResults)
    } catch (err) {
      setError('Failed to load recipes. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [page, activeCategory])

  useEffect(() => {
    fetchRecipes()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [fetchRecipes])

  const totalPages = Math.max(1, Math.ceil(totalResults / ITEMS_PER_PAGE))

  const setPage = (p: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', String(p))
    setSearchParams(newParams)
  }

  const setCategory = (filter: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (filter) {
      newParams.set('category', filter)
    } else {
      newParams.delete('category')
    }
    newParams.set('page', '1')
    setSearchParams(newParams)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            What to <span className="text-amber-500">Cook</span>?
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Discover recipes from around the world, filtered by your mood and cravings.
          </p>
        </div>
      </div>

      <div className="sticky top-16 lg:top-20 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.filter

              return (
                <button
                  key={cat.label}
                  onClick={() => setCategory(cat.filter)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
                    ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : ''}`} />
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500 mb-3" />
            <p className="text-slate-400 text-sm font-medium">Loading recipes...</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">{error}</h3>
            <button
              onClick={fetchRecipes}
              className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && recipes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ChefHat className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              No recipes found
            </h3>
            <p className="text-slate-500 text-sm">
              Try a different category or check back later.
            </p>
          </div>
        )}

        {!loading && !error && recipes.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={() => setPage(Math.max(page - 1, 1))}
                  disabled={page === 1}
                  className={`
                    p-2 rounded-lg transition-colors
                    ${
                      page === 1
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum: number
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`
                          w-9 h-9 rounded-lg text-sm font-medium transition-colors
                          ${
                            page === pageNum
                              ? 'bg-slate-900 text-white'
                              : 'text-slate-600 hover:bg-slate-100'
                          }
                        `}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => setPage(Math.min(page + 1, totalPages))}
                  disabled={page === totalPages}
                  className={`
                    p-2 rounded-lg transition-colors
                    ${
                      page === totalPages
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="inline-flex items-center gap-1 text-white text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
            View Recipe <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-amber-600 transition-colors">
          {recipe.title}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            30 min
          </span>
          <span>·</span>
          <span className="capitalize">{recipe.imageType}</span>
        </div>
      </div>
    </Link>
  )
}

export default RecipeGrid