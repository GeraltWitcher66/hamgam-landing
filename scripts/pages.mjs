// Post-build step for GitHub Pages: copy the SPA entry to 404.html so deep
// links like //<repo>/compare are served by the app, and drop .nojekyll so
// Pages does not run the output through Jekyll.
// Run after scripts/postbuild.mjs (which strips dot-files from dist/client).
import { copyFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const client = fileURLToPath(new URL('../dist/client', import.meta.url))

copyFileSync(join(client, 'index.html'), join(client, '404.html'))
writeFileSync(join(client, '.nojekyll'), '')

console.log('pages: wrote 404.html and .nojekyll')
