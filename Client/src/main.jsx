import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-3ict7i6nwrqknyjf.us.auth0.com"
      clientId="Jfytp4xfHNnRf2i0e8REY0uFEMTVG4LR"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>,
  </BrowserRouter>
  ,
)
