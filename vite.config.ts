import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Explicit .ts extension: Vite's native config loader requires it and warns
// without it when the config imports project files.
import { brand, faq, hero, site } from './src/content.ts'

// Social/SEO tags and structured data are generated from src/content.ts so the
// copy never has to be repeated in index.html. Google Fonts is gone; the page
// loads the self-hosted Vazirmatn variable font from public/fonts.
function seo(): Plugin {
  const title = `${brand.name} — ${brand.tagline}`
  const image = `${site.url}/og.png`

  const tags = [
    `<link rel="canonical" href="${site.url}/" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${brand.name}" />`,
    `<meta property="og:locale" content="fa_IR" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${hero.description}" />`,
    `<meta property="og:url" content="${site.url}/" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${brand.name} — ${brand.tagline}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${hero.description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: brand.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: hero.description,
        url: `${site.url}/`,
        inLanguage: 'fa-IR',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  }

  tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`)

  return {
    name: 'seo-tags',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace('<!--seo-->', tags.join('\n    '))
      },
    },
  }
}

export default defineConfig({
  // Set to /<repo>/ when building for GitHub Pages; the app reads the same
  // value at runtime through import.meta.env.BASE_URL (see src/lib/url.ts).
  base: process.env.PAGES_BASE ?? '/',
  plugins: [react(), tailwindcss(), cloudflare(), seo()],
  server: { port: 5173, strictPort: false },
})
