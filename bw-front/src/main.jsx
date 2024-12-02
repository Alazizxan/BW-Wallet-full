import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {TonConnectUIProvider} from '@tonconnect/ui-react'


import App from './App.jsx'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <TonConnectUIProvider manifestUrl='https://green-worrying-centipede-152.mypinata.cloud/ipfs/QmU9acKKM1g7o6NYg26W1W35EKTjFMaCq7FNQFaYtY9aEk'>
          <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
            <App />
          </BrowserRouter>
      </TonConnectUIProvider>
  </StrictMode>,
)

