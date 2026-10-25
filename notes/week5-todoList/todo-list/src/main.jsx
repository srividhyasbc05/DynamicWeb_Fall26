import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {Provider} from './context/todos'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* whatever goes in `value` is readable by ANY component inside, at any
        depth, without being passed down through a single prop */}
   <Provider>
      <App />
    </Provider>
  </React.StrictMode>
)