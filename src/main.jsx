import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { AppProvider } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider
      i18n={{}}
      theme={{
        colorScheme: 'light',
        logo: {
          width: 124,
          topBarSource: '/vellum-logo.svg',
          contextualSaveBarSource: '/vellum-logo-gray.svg',
          url: '#',
          accessibilityLabel: 'Vellum',
        }
      }}
    >
      <App />
    </AppProvider>
  </StrictMode>
)