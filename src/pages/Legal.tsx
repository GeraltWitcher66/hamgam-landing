import { ArrowRight } from 'lucide-react'

import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { brand, site } from '../content'
import { legalDocs } from '../legal'
import { usePageMeta } from '../lib/meta'
import { url } from '../lib/url'

export function LegalPage({ path }: { path: string }) {
  const doc = legalDocs[path]
  usePageMeta({ title: `${doc.title} — ${brand.name}`, description: doc.intro })

  return (
    <div className="min-h-screen">
      <header className="flex justify-center px-4 pt-6">
        <div className="flex w-full max-w-[820px] items-center justify-between">
          <Logo />
          <a
            href={url('/')}
            className="inline-flex h-9 items-center gap-2 rounded-[12px] px-3 text-[14px] text-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
          >
            بازگشت به صفحه‌ی اصلی
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </header>

      <main id="main" className="pb-24 pt-14">
        <Container className="max-w-[820px]">
          <p className="text-[13px] text-accent">{brand.name}</p>
          <h1 className="mt-3 text-balance text-[32px] font-semibold sm:text-[42px]">{doc.title}</h1>
          <p className="mt-3 text-[13px] text-faint">آخرین به‌روزرسانی: {doc.updated}</p>
          <p className="mt-8 text-pretty text-[16px] leading-relaxed text-muted">{doc.intro}</p>

          <div className="mt-12 flex flex-col gap-10">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-[19px] font-semibold">{section.heading}</h2>
                <div className="mt-3 flex flex-col gap-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-pretty text-[15px] leading-relaxed text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-line pt-6 text-[14px] text-faint">
            پرسشی دارید؟ به{' '}
            <a href={`mailto:${site.email}`} className="text-fg underline underline-offset-4">
              {site.email}
            </a>{' '}
            ایمیل بزنید.
          </p>
        </Container>
      </main>
    </div>
  )
}
