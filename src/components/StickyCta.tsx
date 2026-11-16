import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from './Button'
import { cx } from '../lib/cx'
import { hero, nav } from '../content'

// Shows a compact CTA bar on phones once the hero is scrolled past, and hides
// it again while the real CTA section is on screen.
export function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const ctaSection = document.getElementById('cta')
    let ctaOnScreen = false
    const update = () => setVisible(window.scrollY > 720 && !ctaOnScreen)

    const observer = ctaSection
      ? new IntersectionObserver(
          (entries) => {
            ctaOnScreen = entries.some((entry) => entry.isIntersecting)
            update()
          },
          { rootMargin: '0px 0px -20% 0px' },
        )
      : null
    observer?.observe(ctaSection!)

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      observer?.disconnect()
    }
  }, [])

  return (
    <div
      className={cx(
        'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/85 px-4 pb-4 pt-3 backdrop-blur-xl transition-all duration-300 md:hidden',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0',
      )}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-3">
        <p className="flex-1 text-[13px] leading-tight text-muted">{hero.footnote}</p>
        <Button href={nav.cta.href} className="h-10 px-4 text-[14px]">
          {nav.cta.label}
          <ArrowLeft />
        </Button>
      </div>
    </div>
  )
}
