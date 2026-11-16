import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'

import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Footer } from '../sections/Footer'
import { Nav } from '../sections/Nav'
import { brand, compare } from '../content'
import { track } from '../lib/analytics'
import { url } from '../lib/url'
import { usePageMeta } from '../lib/meta'

export function ComparePage() {
  usePageMeta({ title: `${compare.title} — ${brand.name}`, description: compare.description })

  useEffect(() => {
    track('comparison_view')
  }, [])

  return (
    <>
      <Nav />
      <main id="main" className="pb-8 pt-32 sm:pt-40">
        <Container>
          <p className="text-center text-[13px] font-medium text-accent">{compare.eyebrow}</p>
          <h1 className="mx-auto mt-3 max-w-3xl text-balance text-center text-[32px] font-semibold leading-[1.15] sm:text-[44px]">
            {compare.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-center text-[16px] leading-relaxed text-muted sm:text-[17px]">
            {compare.description}
          </p>

          <div className="depth relative mt-12 overflow-hidden rounded-card bg-surface shadow-glow">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-start text-[14px]">
                <thead>
                  <tr className="border-b border-line">
                    <th scope="col" className="px-5 py-4 text-start text-[13px] font-medium text-faint">
                      ویژگی
                    </th>
                    {compare.columns.map((column, i) => (
                      <th
                        key={column}
                        scope="col"
                        className={
                          i === 0
                            ? 'px-5 py-4 text-center text-[14px] font-semibold text-accent'
                            : 'px-5 py-4 text-center text-[14px] font-medium text-muted'
                        }
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compare.rows.map((row) => (
                    <tr key={row.label} className="border-b border-line last:border-0">
                      <th scope="row" className="px-5 py-4 text-start text-[14px] font-normal text-fg/90">
                        {row.label}
                      </th>
                      {row.values.map((value, i) => (
                        <td
                          key={`${row.label}-${i}`}
                          className={
                            value === '✓'
                              ? 'px-5 py-4 text-center text-[15px] text-accent-2'
                              : value === '—'
                                ? 'px-5 py-4 text-center text-[15px] text-faint'
                                : 'px-5 py-4 text-center text-[13px] text-muted'
                          }
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-[13px] leading-relaxed text-faint">{compare.note}</p>

          <div className="mt-12 flex flex-col items-center gap-3">
            <Button size="lg" href={url('/#cta')}>
              رایگان شروع کنید
              <ArrowLeft />
            </Button>
            <p className="text-[13px] text-faint">تا ۱۰ نفر رایگان؛ کارت بانکی لازم نیست.</p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
