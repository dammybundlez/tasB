import { ChefHat, Mail, ArrowRight, Heart, Globe, Sparkles } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&auto=format&fit=crop"
            alt="Kitchen background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium text-amber-400 uppercase tracking-wider">
                Our Story
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Crafted with{' '}
              <span className="text-amber-400">passion</span> for food lovers
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Welcome to <span className="font-semibold text-white">Flavoriz</span> — 
              your destination for discovering recipes that turn everyday cooking into 
              something extraordinary.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop"
                alt="Chef preparing food"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg border border-slate-200 p-4 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">500K+</p>
                  <p className="text-xs text-slate-500 font-medium">Recipes loved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">
              Cooking made <span className="text-amber-500">simple</span> and{' '}
              <span className="text-amber-500">delicious</span>
            </h2>
            
            <p className="text-slate-600 leading-relaxed">
              Whether you're a curious beginner experimenting with your first dish, 
              or a seasoned home chef looking for inspiration, we're here to make your 
              cooking journey fun, flavorful, and stress-free.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Our recipe collection is powered by the{' '}
              <a
                href="https://spoonacular.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 font-medium hover:text-amber-700 underline underline-offset-2"
              >
                Spoonacular API
              </a>
              , curated and presented in a clean, intuitive interface designed to get 
              you cooking faster.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                { icon: Globe, label: 'Global cuisines', desc: 'Recipes from every corner of the world' },
                { icon: Sparkles, label: 'Curated daily', desc: 'Fresh picks updated every morning' },
                { icon: ChefHat, label: 'All skill levels', desc: 'From quick meals to gourmet dishes' },
                { icon: Heart, label: 'Save favorites', desc: 'Build your personal cookbook' },
              ].map((feature) => (
                <div key={feature.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{feature.label}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-4" />
          <blockquote className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug mb-4">
            "Cooking is an art, and every recipe is a canvas."
          </blockquote>
          <p className="text-slate-500 font-medium">— The Flavoriz Team</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Want to contribute or give feedback?
            </h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Have a recipe to share or an idea to make Flavoriz better? 
              We'd love to hear from you.
            </p>
            
            <a
              href="mailto:hello@flavoriz.com"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-xl transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About