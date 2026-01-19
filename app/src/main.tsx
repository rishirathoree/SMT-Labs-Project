import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router"
import { SidebarProvider } from './components/ui/sidebar.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.tsx'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider >
        <QueryClientProvider client={queryClient}>
        <Provider store={store}>
        <App />
        </Provider>
        </QueryClientProvider>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>,
)
