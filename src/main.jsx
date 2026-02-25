import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import MobileConcept from './MobileConcept'

const isMobile = window.location.hash === '#mobile'

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    {isMobile ? <MobileConcept /> : <App />}
  </React.StrictMode>
)

window.addEventListener('hashchange', () => location.reload())