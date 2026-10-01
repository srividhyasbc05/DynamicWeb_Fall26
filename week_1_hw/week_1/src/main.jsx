import React from 'react';
//DOM is for web (if we were doing mobile it would be React Native)
import ReactDOM from 'react-dom/client';
// imported component so we can render it in JSX
import App from './App.jsx';

//the div w id root in index.html is where we will render our app
// plain js
const el = document.getElementById('root');

// the real root of the project will be this element
// React's way of saying hand the root to React so we can inject JSX to it
const root = ReactDOM.createRoot(el);

// render the project in the root
root.render(
  // guardrail that prevents things like p5 being injected
<React.StrictMode>
  <App />
</React.StrictMode>
);