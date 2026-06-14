import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useGSAP } from '@gsap/react'
import './index.css'
import App from './App'
import { gsap } from './lib/gsap'
import { initLenis } from './lib/lenis'

// Register the @gsap/react plugin once at app entry
gsap.registerPlugin(useGSAP)

// Initialize Lenis smooth scroll
initLenis()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
