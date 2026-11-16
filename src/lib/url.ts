// Base-aware internal links. The site is served from the domain root in
// development and from /<repo>/ on GitHub Pages, so every internal href goes
// through url() instead of a hard-coded leading slash.
const base = import.meta.env.BASE_URL // '/' or '/repo/'

export function url(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path
  return base.replace(/\/$/, '/') + path.replace(/^\//, '')
}

// Strips the base prefix so the router compares plain paths like '/compare'.
export function routePath(pathname: string): string {
  const rest = pathname.startsWith(base) ? pathname.slice(base.length) : pathname.replace(/^\//, '')
  return '/' + rest.replace(/\/+$/, '')
}
