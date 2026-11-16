// Measurement hook, deliberately provider-agnostic.
//
// Nothing is sent anywhere until you add one snippet to index.html:
//   - GA4 / Tag Manager: the gtag or GTM snippet creates window.dataLayer
//   - Plausible / Umami: their snippet creates window.plausible (or is read
//     from the page view; the custom-event API is what we call here)
//   - Anything else: push to dataLayer and forward it in your own snippet.
//
// Every call is wrapped: analytics must never break the page or block a form.

type EventProps = Record<string, string | number | boolean>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    plausible?: (event: string, options?: { props?: EventProps }) => void
  }
}

export function track(event: string, props: EventProps = {}) {
  if (typeof window === 'undefined') return
  try {
    window.dataLayer?.push({ event, ...props })
    window.plausible?.(event, { props })
  } catch {
    // Ignore: a blocked or broken analytics script is not a user-facing error.
  }
}
