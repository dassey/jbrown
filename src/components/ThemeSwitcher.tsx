import { useState } from 'react'
import { THEMES } from '../theme/themes'
import { useThemeStore } from '../theme/useTheme'
import { cn } from '../lib/ui'

function Dots({ colors, size }: { colors: string[]; size: number }) {
  return (
    <span className="flex shrink-0">
      {colors.map((c, i) => (
        <span key={i} className="rounded-full ring-1 ring-black/10" style={{ background: c, width: size, height: size, marginLeft: i ? -size * 0.36 : 0 }} />
      ))}
    </span>
  )
}

export function ThemeSwitcher({ align = 'right' }: { align?: 'left' | 'right' }) {
  const themeId = useThemeStore((s) => s.themeId)
  const setTheme = useThemeStore((s) => s.setTheme)
  const [open, setOpen] = useState(false)
  const active = THEMES.find((t) => t.id === themeId) ?? THEMES[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        title="Theme"
        aria-label="Change theme"
        className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-2.5 py-1.5 text-ink-soft transition-colors hover:bg-ink/[0.05] hover:text-ink"
      >
        <Dots colors={active.swatch} size={14} />
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className={cn('absolute z-40 mt-2 w-64 overflow-hidden rounded-xl border border-line bg-paper p-1.5 shadow-[var(--shadow-float)]', align === 'right' ? 'right-0' : 'left-0')}>
            <p className="px-2.5 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">Theme</p>
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); setOpen(false) }}
                className={cn('flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors', t.id === themeId ? 'bg-brass/10' : 'hover:bg-ink/[0.04]')}
              >
                <Dots colors={t.swatch} size={20} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-semibold text-ink">{t.label}</span>
                  <span className="block truncate text-[11px] text-ink-faint">{t.blurb}</span>
                </span>
                {t.id === themeId && (
                  <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-brass-deep" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 10.5l3.5 3.5L15 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
