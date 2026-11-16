// Post-build step for GitHub Pages.
//
// 1. Writes a real index.html for every static route (/compare/, /privacy/, …)
//    so those URLs answer 200 instead of the SPA fallback's 404 status, and
//    each one gets its own canonical + og:url.
// 2. Copies the entry to 404.html so unknown deep links still load the app.
// 3. Drops .nojekyll so Pages does not run the output through Jekyll.
//
// Run after scripts/postbuild.mjs, which strips dot-files from dist/client.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const client = fileURLToPath(new URL('../dist/client', import.meta.url))
const routes = ['compare', 'privacy', 'terms', 'cookies']

const siteUrl = (process.env.SITE_URL ?? 'https://geraltwitcher66.github.io').replace(/\/+$/, '').toLowerCase()
const pagesBase = (process.env.PAGES_BASE ?? '/').replace(/\/+$/, '')
const base = `${siteUrl}${pagesBase}`
const html = readFileSync(join(client, 'index.html'), 'utf8')

for (const route of routes) {
  const routeUrl = `${base}/${route}/`
  const page = html
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${routeUrl}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${routeUrl}$2`)
  mkdirSync(join(client, route), { recursive: true })
  writeFileSync(join(client, route, 'index.html'), page)
}

copyFileSync(join(client, 'index.html'), join(client, '404.html'))
writeFileSync(join(client, '.nojekyll'), '')

console.log(`pages: wrote ${routes.length} route pages, 404.html and .nojekyll`)
