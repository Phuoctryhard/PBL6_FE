import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/app.context.jsx'
import {  HelmetProvider } from 'react-helmet-async'
// Create a client để mà có thể refresh lại
export const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
        <ToastContainer />
      </HelmetProvider>
    </QueryClientProvider>
  </BrowserRouter>
  // </React.StrictMode>
)

reportWebVitals()
