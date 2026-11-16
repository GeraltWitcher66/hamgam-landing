import { Container } from '../components/Container'
import type { ReactElement } from 'react'
import { Reveal } from '../components/Reveal'
import { logos } from '../content'

// Minimal geometric marks so the row reads as real brands without
// borrowing anyone's identity. Swap for customer SVGs when you have them.
const marks: Record<string, ReactElement> = {
  'دیجی‌کالا': <path d="M4 7h16l-1.5 12H5.5zM9 7a3 3 0 0 1 6 0" />,
  اسنپ: <path d="M12 3c3.5 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2.5-6 6-11z" />,
  دیوار: <path d="M4 20V7l8-3 8 3v13M9 20v-6h6v6" />,
  'کافه‌بازار': <path d="M5 8h14l-1 11H6zM9 8V6a3 3 0 0 1 6 0v2" />,
  تپسی: <circle cx="12" cy="12" r="8" />,
  ترب: <path d="M12 4 20 19H4z" />,
  'زرین‌پال': <path d="M12 3 20 6v6c0 5-4 8-8 9-4-1-8-4-8-9V6z" />,
  'علی‌بابا': <path d="M4 12c3-6 13-6 16 0-3 6-13 6-16 0zM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />,
}

export function LogoCloud() {
  const doubled = [...logos, ...logos]
  return (
    <section className="py-12">
      <Container>
        <Reveal>
          <p className="text-center text-[13px] text-faint">تیم‌های محصول این شرکت‌ها با همگام کار می‌کنند</p>
        </Reveal>
        <div className="section-mask relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <ul className="flex w-max animate-marquee items-center gap-14 pl-14 hover:[animation-play-state:paused]">
            {doubled.map((name, i) => (
              <li key={`${name}-${i}`} className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight text-fg/45">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {marks[name] ?? <circle cx="12" cy="12" r="7" />}
                </svg>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
