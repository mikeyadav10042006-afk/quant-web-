import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Dynamic import to avoid CJS/ESM interop crash with @splinetool/viewer
import('@splinetool/viewer').catch((e) => console.warn('Spline viewer preload failed:', e.message));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
