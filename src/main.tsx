import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import { ComparePage } from './pages/Compare'
import { LegalPage } from './pages/Legal'
import { legalDocs } from './legal'
import { routePath } from './lib/url'
import './styles.css'

// No router library: the host serves index.html for every path (SPA fallback),
// so the static routes just read window.location and drop the deploy base.
const path = routePath(window.location.pathname)

function Route() {
  if (path === '/compare') return <ComparePage />
  if (path in legalDocs) return <LegalPage path={path} />
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Route />
  </StrictMode>,
)
