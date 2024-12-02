import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App4.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
