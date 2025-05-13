import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UseFavContext } from './context/FavContext.tsx'
import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UseFavContext>
      <App />
    </UseFavContext>
  </StrictMode>,
)
