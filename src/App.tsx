// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './pages/Header'
import RecipeGrid from './pages/RecipeGrid'
import RecipeDetail from './pages/RecipeDetail'
import About from './pages/About.tsx'
import Favorites from './pages/Favorites.tsx'
import './index.css'
import Home from './pages/Home.tsx'



function App() {
  return (
    <Router>
      <div className="min-h-screen font-roboto flex flex-col text-gray-900">
        <Header />
        <main className="flex-1 container mx-auto px-2 lg:px-10 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipeGrid />} />
            <Route path="/about" element={<About />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  )
}

export default App
