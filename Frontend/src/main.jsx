import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import StoreContexProvider from './Context/StoreContex.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <HashRouter>
 <StoreContexProvider>
 <App />
 </StoreContexProvider>
 
 </HashRouter>
    
  
)
