import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {WorkspaceProvider} from './components/context/workspace'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <WorkspaceProvider>
      <App />
    </WorkspaceProvider>
  </React.StrictMode>
)