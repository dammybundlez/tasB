import { Link } from 'react-router-dom'
import { BsInstagram , BsTwitter , BsFacebook } from 'react-icons/bs'
const Footer = () => (
  <footer className="bg-slate-900 text-white mt-20">
    <div className=" px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">
            FLA<span className="text-amber-500">VORIZ</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
            Discover, cook, and share amazing recipes from around the world.
            Join our community of food lovers today.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/recipes" className="hover:text-white transition">Recipes</Link></li>
            <li><Link to="/favorites" className="hover:text-white transition">Favorites</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Connect</h3>
          <div className="flex gap-3">
            {[BsInstagram, BsTwitter, BsFacebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2025 Flavoriz. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer