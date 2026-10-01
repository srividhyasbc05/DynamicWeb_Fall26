import { StrictMode } from 'react' // named exports from a library
import { createRoot } from 'react-dom/client' 
// usually import hooks but StrictMode is for warnings, hints, errors, we want it to throw errors
import './global.css' // global styles, no need to import in each component
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
