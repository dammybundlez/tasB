import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  ChefHat,
  ArrowRight,
  Loader2,
  AlertCircle,
  Clock,
  Flame,
} from 'lucide-react'

interface SimilarRecipe {
  id: number
  title: string
  readyInMinutes: number
  servings: number
  sourceUrl: string
}

interface SimilarItemProps {
  id: string
}

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || '93e68c41440948eb9b00e79f8e8fa67b'

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1539136788836-5699e78bfc75?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&auto=format&fit=crop',
]

const SimilarItem = ({ id }: SimilarItemProps) => {
  const [similar, setSimilar] = useState<SimilarRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSimilar = async () => {
      if (!API_KEY) {
        setError('API key not configured')
        setLoading(false)
        return
      }

      try {
        const res = await axios.get<SimilarRecipe[]>(
          `https://api.spoonacular.com/recipes/${id}/similar`,
          {
            params: {
              number: 8,
              apiKey: API_KEY,
            },
          }
        )
        setSimilar(res.data)
      } catch (err) {
        setError('Failed to load similar recipes')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSimilar()
  }, [id])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 320
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-8 text-slate-400">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">Finding similar recipes...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 py-8 text-rose-500 text-sm">
        <AlertCircle className="w-4 h-4" />
        {error}
      </div>
    )
  }

  if (similar.length === 0) {
    return (
      <p className="text-slate-400 text-sm py-8">No similar recipes found.</p>
    )
  }

  return (
    <div className="relative group">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur shadow-lg rounded-full flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 -translate-x-1/2"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur shadow-lg rounded-full flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 translate-x-1/2"
      >
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4"
      >
        {similar.map((recipe, index) => (
          <SimilarCard
            key={recipe.id}
            recipe={recipe}
            imageUrl={FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
          />
        ))}
      </div>
    </div>
  )
}

const SimilarCard = ({recipe, imageUrl}: { recipe: SimilarRecipe, imageUrl: string}) => {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="flex-shrink-0 w-72 snap-start group/card"
    >
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300">
            <span className="inline-flex items-center gap-1.5 text-white text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
              View Recipe
              <ChefHat className="w-3 h-3" />
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 group-hover/card:text-amber-600 transition-colors">
            {recipe.title}
          </h3>

          <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {recipe.readyInMinutes}m
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3" />
              {recipe.servings} servings
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SimilarItem