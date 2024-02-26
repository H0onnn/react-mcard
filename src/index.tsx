import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles'

import { AlertContextProvider } from '@contexts/AlertContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <>
    <Global styles={globalStyles} />
    <AlertContextProvider>
      <App />
    </AlertContextProvider>
  </>,
)
