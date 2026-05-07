import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

interface HeroBannerProps {
  title?: string
  highlight?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: string
}

const HeroBanner = ({
  title = 'Explore',
  highlight = 'Culinary',
  subtitle = 'Insights',
  ctaText = 'Discover Recipes',
  ctaLink = '/',
  backgroundImage,
}: HeroBannerProps) => {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="absolute inset-0">
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900" />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative px-6 py-12 md:py-16 lg:py-20 lg:px-12">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-amber-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Featured Collection
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {title}{' '}
            <span className="text-amber-400">{highlight}</span> {subtitle}
          </h1>

          <button
            className="inline-flex items-center gap-2 mt-6 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-colors group"
          >
            {ctaText}
            {/* <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /> */}
          </button>
        </div>
      </div>
    </div>
  )
}

export const DefaultBanner = () => {
  const banner = new URL('../assets/img2.png', import.meta.url).href

  return (
    <HeroBanner
      backgroundImage={banner}
      title="Explore"
      highlight="Culinary"
      subtitle="Insights"
      ctaText="Start Cooking"
      ctaLink="/recipes"
    />
  )
}

export default HeroBanner