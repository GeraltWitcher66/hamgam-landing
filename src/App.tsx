import { StickyCta } from './components/StickyCta'
import { Cta } from './sections/Cta'
import { Faq } from './sections/Faq'
import { Features } from './sections/Features'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { LogoCloud } from './sections/LogoCloud'
import { Metrics } from './sections/Metrics'
import { Nav } from './sections/Nav'
import { Pricing } from './sections/Pricing'
import { Showcase } from './sections/Showcase'
import { Steps } from './sections/Steps'
import { Testimonials } from './sections/Testimonials'
import { Trust } from './sections/Trust'

// The page is a stack of independent sections. Remove or reorder freely;
// copy for each lives in src/content.ts.
export function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-[12px] focus:bg-fg focus:px-4 focus:py-2 focus:text-[14px] focus:font-medium focus:text-bg"
      >
        رفتن به محتوای اصلی
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <LogoCloud />
        <Features />
        <Steps />
        <Showcase />
        <Metrics />
        <Testimonials />
        <Trust />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
