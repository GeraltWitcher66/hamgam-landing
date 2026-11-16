import { motion } from 'motion/react'
import { BarChart3, Inbox, KanbanSquare, Layers, Target } from 'lucide-react'

import { LogoMark } from './Logo'
import { Monogram } from './Monogram'
import { cx } from '../lib/cx'
import { brand } from '../content'

const navItems = [
  { icon: Inbox, label: 'صندوق ورودی', count: 4 },
  { icon: Layers, label: 'پروژه‌ها' },
  { icon: KanbanSquare, label: 'تخته', active: true },
  { icon: BarChart3, label: 'گزارش‌ها' },
  { icon: Target, label: 'هدف‌ها' },
]

const rows = [
  { title: 'بازطراحی مسیر ورود کاربر', owner: 'س', hue: 250, status: 'در حال انجام', tone: 'accent' },
  { title: 'وبهوک‌های پرداخت نسخه ۲', owner: 'ا', hue: 170, status: 'در بررسی', tone: 'violet' },
  { title: 'اعلان‌های پوش موبایل', owner: 'ن', hue: 20, status: 'تحویل شد', tone: 'teal' },
  { title: 'پیش‌نویس نقشه راه فصلی', owner: 'م', hue: 300, status: 'برنامه‌ریزی‌شده', tone: 'muted' },
  { title: 'تنظیم ربط نتایج جست‌وجو', owner: 'ال', hue: 120, status: 'در حال انجام', tone: 'accent' },
  { title: 'آزمون‌های مسیر دعوت', owner: 'ب', hue: 40, status: 'در بررسی', tone: 'violet' },
  { title: 'ورود یکپارچه برای پلن سازمانی', owner: 'ا', hue: 170, status: 'تحویل شد', tone: 'teal' },
]

const favorites = [
  { label: 'ورود کاربر نسخه ۳', hue: 250 },
  { label: 'صورتحساب', hue: 170 },
  { label: 'اپلیکیشن موبایل', hue: 20 },
  { label: 'نقشه راه فصل ۴', hue: 300 },
]

const toneClass: Record<string, string> = {
  accent: 'bg-accent/15 text-accent',
  violet: 'bg-accent-3/15 text-accent-3',
  teal: 'bg-accent-2/15 text-accent-2',
  muted: 'bg-white/[0.06] text-muted',
}

export function DashboardMock() {
  return (
    <div className="depth relative flex aspect-[16/10] w-full overflow-hidden rounded-window bg-surface text-start shadow-glow sm:aspect-[16/9]">
      {/* Sidebar */}
      <aside className="hidden w-[200px] shrink-0 flex-col border-l border-line bg-bg/60 p-3 sm:flex">
        <div className="flex items-center gap-2 px-1.5 py-1">
          <LogoMark className="size-6 rounded-[8px]" />
          <span className="text-[12px] font-semibold">{brand.name}</span>
        </div>
        <ul className="mt-4 flex flex-col gap-0.5">
          {navItems.map(({ icon: Icon, label, count, active }) => (
            <li
              key={label}
              className={cx(
                'flex h-8 items-center gap-2 rounded-[10px] px-2 text-[12px]',
                active ? 'bg-white/[0.07] text-fg' : 'text-muted',
              )}
            >
              <Icon className="size-3.5" />
              <span className="flex-1">{label}</span>
              {count && <span className="rounded-[6px] bg-accent/20 px-1.5 text-[10px] text-accent">{count}</span>}
            </li>
          ))}
        </ul>
        <p className="mt-5 px-2 text-[11px] text-faint">موردعلاقه‌ها</p>
        <ul className="mt-1 flex flex-col gap-0.5">
          {favorites.map((f) => (
            <li key={f.label} className="flex h-7 items-center gap-2 rounded-[10px] px-2 text-[12px] text-muted">
              <span className="size-2 rounded-[3px]" style={{ background: `hsl(${f.hue} 70% 65%)` }} />
              {f.label}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-1.5 px-1.5">
          <Monogram initials="س" hue={250} />
          <Monogram initials="ا" hue={170} className="-me-3 ring-2 ring-bg" />
          <Monogram initials="ن" hue={20} className="-me-3 ring-2 ring-bg" />
          <span className="ms-1 text-[11px] text-faint">+۹ آنلاین</span>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 items-center justify-between border-b border-line px-4">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-medium">این هفته</span>
            <span className="hidden text-[12px] text-faint sm:inline">۲۸ مهر تا ۲ آبان</span>
          </div>
          <div className="depth relative flex items-center gap-1 rounded-[10px] bg-white/[0.04] p-0.5 text-[11px]">
            <span className="rounded-[8px] bg-white/[0.08] px-2 py-1 text-fg">تخته</span>
            <span className="px-2 py-1 text-muted">فهرست</span>
            <span className="px-2 py-1 text-muted">زمان‌بندی</span>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-3 grid-rows-[auto_1fr] gap-3 p-4">
          {[
            { label: 'در مسیر', value: '۱۲', delta: '+۳', tone: 'text-accent-2' },
            { label: 'در خطر', value: '۳', delta: '-۱', tone: 'text-accent-3' },
            { label: 'تحویل‌شده', value: '۲۷', delta: '+۸', tone: 'text-accent' },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
              className="depth relative rounded-[14px] bg-white/[0.02] p-3"
            >
              <p className="text-[11px] text-muted">{kpi.label}</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-[20px] font-semibold tracking-tight">{kpi.value}</span>
                <span className={cx('text-[11px]', kpi.tone)}>{kpi.delta}</span>
              </div>
            </motion.div>
          ))}

          <div className="depth relative col-span-3 flex flex-col rounded-[14px] bg-white/[0.02] p-3 md:col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-medium">خروجی کار</p>
              <span className="text-[11px] text-faint">۳۰ روز گذشته</span>
            </div>
            <Chart />
            <div className="mt-auto grid grid-cols-3 gap-2 border-t border-line pt-3 text-[11px]">
              {[
                ['کارهای بسته‌شده', '۱۴۲'],
                ['میانه‌ی زمان چرخه', '۲.۴ روز'],
                ['انتقال به هفته بعد', '۶٪'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-faint">{label}</p>
                  <p className="mt-0.5 text-[13px] font-medium text-fg">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="depth relative col-span-3 hidden flex-col rounded-[14px] bg-white/[0.02] p-3 md:col-span-1 md:flex">
            <p className="text-[12px] font-medium">منتظر شما</p>
            <ul className="mt-2 flex flex-col gap-2">
              {rows.map((row, i) => (
                <motion.li
                  key={row.title}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.45 }}
                  className="flex items-center gap-2"
                >
                  <Monogram initials={row.owner} hue={row.hue} className="size-5 text-[9px]" />
                  <span className="min-w-0 flex-1 truncate text-[11px] text-fg/90">{row.title}</span>
                  <span className={cx('shrink-0 rounded-[6px] px-1.5 py-0.5 text-[10px]', toneClass[row.tone])}>{row.status}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function Chart() {
  const points = [12, 18, 15, 22, 26, 24, 30, 28, 34, 38, 36, 44, 42, 50]
  const w = 400
  const h = 120
  const max = Math.max(...points) * 1.15
  const step = w / (points.length - 1)
  const coords = points.map((p, i) => [i * step, h - (p / max) * h] as const)
  const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${w},${h} L0,${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-auto max-h-[180px] w-full flex-1" preserveAspectRatio="none">
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff7a45" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff7a45" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff7a45" />
          <stop offset="1" stopColor="#ffb547" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      <motion.path
        d={area}
        fill="url(#area)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="url(#stroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.7, duration: 1.4, ease: 'easeInOut' }}
      />
      <motion.circle
        cx={coords[coords.length - 1][0]}
        cy={coords[coords.length - 1][1]}
        r="4"
        fill="#ffb547"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
        style={{ transformOrigin: `${coords[coords.length - 1][0]}px ${coords[coords.length - 1][1]}px` }}
      />
    </svg>
  )
}
