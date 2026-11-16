import { Hono } from 'hono'
import { bodyLimit } from 'hono/body-limit'

// The Worker in front of the static site. Add API routes here; everything
// else falls through to the built assets (single-page-application mode).
type Env = {
  ASSETS: Fetcher
}

const app = new Hono<{ Bindings: Env }>()

app.use('/api/*', bodyLimit({ maxSize: 16 * 1024, onError: (c) => c.json({ error: 'درخواست بیش از حد بزرگ است.' }, 413) }))

app.get('/api/health', (c) => c.json({ ok: true }))

// Newsletter / waitlist capture. Wire this to your email provider or a D1
// table; it currently just acknowledges the address.
app.post('/api/subscribe', async (c) => {
  const body = await c.req.json<{ email?: unknown }>().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: 'یک ایمیل معتبر وارد کنید.' }, 400)
  }
  return c.json({ ok: true, demo: true })
})

app.all('/api/*', (c) => c.json({ error: 'پیدا نشد.' }, 404))

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
