import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AlertContextProvider } from '@contexts/AlertContext'

const client = new QueryClient({
  defaultOptions: {},
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <>
    <Global styles={globalStyles} />
    <QueryClientProvider client={client}>
      <AlertContextProvider>
        <App />
      </AlertContextProvider>
    </QueryClientProvider>
  </>,
)
