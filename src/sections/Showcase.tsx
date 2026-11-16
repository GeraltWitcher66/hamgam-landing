import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { Container } from '../components/Container'
import { Monogram } from '../components/Monogram'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { showcase } from '../content'
import { cx } from '../lib/cx'

export function Showcase() {
  const [active, setActive] = useState(showcase.tabs[0].key)
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={showcase.eyebrow} title={showcase.title} align="left" />
        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-12">
          <Reveal>
            <ul role="tablist" aria-label="نمای فضای کاری" className="flex flex-col gap-1">
              {showcase.tabs.map((tab) => {
                const isActive = tab.key === active
                return (
                  <li key={tab.key} role="presentation">
                    <button
                      type="button"
                      role="tab"
                      id={`tab-${tab.key}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${tab.key}`}
                      onClick={() => setActive(tab.key)}
                      className={cx(
                        'relative w-full rounded-card-sm px-5 py-4 text-start transition-colors',
                        isActive ? 'bg-surface' : 'hover:bg-white/[0.03]',
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="showcase-active"
                          className="depth absolute inset-0 rounded-card-sm"
                          transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                        />
                      )}
                      <span className={cx('relative block text-[16px] font-semibold', isActive ? 'text-fg' : 'text-muted')}>
                        {tab.title}
                      </span>
                      <span className="relative mt-1 block text-[14px] leading-relaxed text-muted">{tab.description}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="depth relative aspect-[16/10] overflow-hidden rounded-card bg-surface shadow-glow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  role="tabpanel"
                  id={`panel-${active}`}
                  aria-labelledby={`tab-${active}`}
                  tabIndex={0}
                  className="absolute inset-0 p-5 sm:p-7"
                >
                  {active === 'inbox' && <InboxPanel />}
                  {active === 'board' && <BoardPanel />}
                  {active === 'report' && <ReportPanel />}
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

const inbox = [
  { who: 'س', hue: 250, title: 'سارا بازبینی «ورود کاربر نسخه ۳» را درخواست کرد', when: '۲د' },
  { who: 'ا', hue: 170, title: 'وبهوک‌های صورت‌حساب به «در حال بررسی» رفت', when: '۱۴د' },
  { who: 'ن', hue: 20, title: 'نگار شما را در «چک‌لیست انتشار» منشن کرد', when: '۱س' },
  { who: 'م', hue: 300, title: 'هدف‌های هفته‌ی آینده آماده‌ی تأیید است', when: '۳س' },
  { who: 'ال', hue: 120, title: 'اعلان پوش موبایل به نسخه‌ی نهایی رسید', when: '۵س' },
  { who: 'ب', hue: 40, title: 'بابک پیش‌نویس نقشه راه فصل چهارم را به اشتراک گذاشت', when: '۱ر' },
  { who: 'س', hue: 250, title: '«ورود کاربر نسخه ۳» آماده‌ی تأیید شماست', when: '۲ر' },
]

function InboxPanel() {
  return (
    <ul className="flex h-full flex-col gap-2">
      {inbox.map((item, i) => (
        <motion.li
          key={item.title}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className={cx(
            'depth relative flex items-center gap-3 rounded-[14px] px-4 py-3',
            i === 0 ? 'bg-white/[0.04] [--depth-edge:rgb(255_236_224/0.22)]' : '[--depth-edge:var(--color-line)]',
          )}
        >
          <Monogram initials={item.who} hue={item.hue} className="size-7 text-[11px]" />
          <span className="min-w-0 flex-1 truncate text-[13px] sm:text-[14px]">{item.title}</span>
          <span className="text-[12px] tabular-nums text-faint">{item.when}</span>
        </motion.li>
      ))}
    </ul>
  )
}

const board = [
  { title: 'برنامه‌ریزی‌شده', cards: ['بازطراحی صفحه تعرفه', 'بازبینی توکن‌های طراحی'] },
  { title: 'در حال انجام', cards: ['ورود کاربر نسخه ۳', 'رتبه‌بندی نتایج جست‌وجو', 'دعوت اعضای تیم'] },
  { title: 'بازبینی', cards: ['وبهوک‌های صورت‌حساب'] },
  { title: 'انجام‌شده', cards: ['اعلان پوش موبایل', 'ورود یکپارچه سازمانی'] },
]

// Clickable demo: a card moves to the next column, so visitors can feel the
// board instead of only looking at a picture of it.
function BoardPanel() {
  const [columns, setColumns] = useState(() => board.map((col) => [...col.cards]))

  function move(ci: number, card: string) {
    setColumns((prev) => {
      const next = prev.map((col) => [...col])
      next[ci] = next[ci].filter((item) => item !== card)
      next[(ci + 1) % next.length].push(card)
      return next
    })
  }

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="grid flex-1 grid-cols-2 gap-3 overflow-hidden sm:grid-cols-4">
        {columns.map((cards, ci) => (
          <div key={board[ci].title} className="flex min-w-0 flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[12px] font-medium text-muted">{board[ci].title}</span>
              <span className="text-[11px] tabular-nums text-faint">{cards.length.toLocaleString('fa-IR')}</span>
            </div>
            {cards.map((card, i) => (
              <motion.button
                key={card}
                type="button"
                layout
                onClick={() => move(ci, card)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.05 + i * 0.06, layout: { duration: 0.3 } }}
                className="depth relative rounded-[12px] bg-white/[0.03] p-3 text-start transition-colors hover:bg-white/[0.07]"
              >
                <p className="text-[12px] leading-snug sm:text-[13px]">{card}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="h-1.5 w-10 rounded-[3px] bg-accent/50" />
                  <Monogram
                    initials={['س', 'ا', 'ن', 'م'][(ci + i) % 4]}
                    hue={[250, 170, 20, 300][(ci + i) % 4]}
                    className="size-5 text-[9px]"
                  />
                </div>
              </motion.button>
            ))}
          </div>
        ))}
      </div>
      <p className="px-1 text-[11px] text-faint">روی هر کارت بزنید تا به مرحله‌ی بعد برود.</p>
    </div>
  )
}

function ReportPanel() {
  const series = [
    { label: 'سرعت تحویل', values: [40, 48, 44, 56, 62, 58, 70], color: '#ff7a45' },
    { label: 'زمان چرخه', values: [70, 64, 66, 58, 52, 50, 44], color: '#ffb547' },
  ]
  const w = 600
  const h = 220
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-5">
        {series.map((s) => (
          <span key={s.label} className="flex items-center gap-2 text-[12px] text-muted">
            <span className="round size-2" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
        <span className="ms-auto text-[12px] text-faint">۷ هفته گذشته</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 h-full w-full flex-1" preserveAspectRatio="none">
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="rgba(255,255,255,0.06)" />
        ))}
        {series.map((s) => {
          const step = w / (s.values.length - 1)
          const d = s.values.map((v, i) => `${i === 0 ? 'M' : 'L'}${i * step},${h - (v / 100) * h}`).join(' ')
          return (
            <motion.path
              key={s.label}
              d={d}
              fill="none"
              stroke={s.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          )
        })}
      </svg>
    </div>
  )
}
