import { Activity, DatabaseBackup, KeyRound, Lock, ScrollText, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { trust } from '../content'

const icons: LucideIcon[] = [ShieldCheck, Lock, KeyRound, DatabaseBackup, ScrollText, Activity]

export function Trust() {
  return (
    <section id="trust" className="scroll-mt-24 border-t border-line py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={trust.eyebrow} title={trust.title} description={trust.description} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trust.items.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.08} className="h-full">
                <article className="depth relative flex h-full flex-col gap-3 rounded-card bg-surface p-6 shadow-glow">
                  <span className="depth relative grid size-10 place-items-center rounded-[13px] bg-white/[0.04] text-accent">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="text-[16px] font-semibold">{item.title}</h3>
                  <p className="text-[14px] leading-relaxed text-muted">{item.description}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
