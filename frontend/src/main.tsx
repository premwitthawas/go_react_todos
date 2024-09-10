import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import QueryProvider from './providers/QueryProvider.tsx'
import Navbar from './components/headers/Navbar.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <QueryProvider>
      <Navbar />
      <App />
    </QueryProvider>
  // </StrictMode>,
)
