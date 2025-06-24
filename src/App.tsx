// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header.tsx'
import RecipeGrid from './pages/RecipeGrid'
import RecipeDetail from './pages/RecipeDetail'
import About from './pages/About.tsx'
import Favorites from './pages/Favorites.tsx'
import './index.css'
import NotFound from './pages/NotFound.tsx'


function App() {
  return (
    <Router>
      <div className=" font-roboto flex flex-col text-gray-900">
        <Header />
        <main className="flex-1 container mx-auto px-2 lg:px-10 py-1">
          <Routes>
            <Route path="/" element={<RecipeGrid />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
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
