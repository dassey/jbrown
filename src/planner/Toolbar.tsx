import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { TEMPLATES } from '../model/templates'
import { usePlanner } from '../store/store'
import { encodePlan } from '../lib/share'
import { exportPNG } from './canvasExport'
import { buttonClass, cn } from '../lib/ui'

function IconButton({ active, onClick, label, children }: { active?: boolean; onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={cn('grid h-9 w-9 place-items-center rounded-lg transition-colors', active ? 'bg-brass/20 text-brass-deep' : 'text-ink-soft hover:bg-ink/[0.06] hover:text-ink')}
    >
      {children}
    </button>
  )
}

export function Toolbar({ onOpenLibrary, onOpenPanels }: { onOpenLibrary: () => void; onOpenPanels: () => void }) {
  const view = usePlanner((s) => s.view)
  const setView = usePlanner((s) => s.setView)
  const showGrid = usePlanner((s) => s.showGrid)
  const snap = usePlanner((s) => s.snap)
  const toggleGrid = usePlanner((s) => s.toggleGrid)
  const toggleSnap = usePlanner((s) => s.toggleSnap)
  const reset = usePlanner((s) => s.reset)
  const loadTemplate = usePlanner((s) => s.loadTemplate)
  const plan = usePlanner((s) => s.plan)

  const [tplOpen, setTplOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  function share() {
    const url = `${location.origin}${location.pathname}#/plan?d=${encodePlan(plan)}`
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <header className="relative z-30 flex h-14 items-center justify-between gap-2 border-b border-line bg-bone/95 px-3 backdrop-blur sm:px-4">
      {/* left */}
      <div className="flex items-center gap-2">
        <Link to="/" className="text-ink"><Logo size="sm" showWordmark={false} /></Link>
        <span className="hidden font-display text-[15px] font-semibold text-ink md:inline">{plan.project.name}</span>
        {/* mobile: add */}
        <button onClick={onOpenLibrary} className={buttonClass('subtle', 'sm', 'lg:hidden')}>+ Add</button>
      </div>

      {/* center: 2D / 3D */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <div className="flex rounded-full border border-line bg-paper p-0.5">
          {(['2d', '3d'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn('rounded-full px-4 py-1.5 text-sm font-semibold uppercase tracking-wide transition-colors', view === v ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink')}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* right */}
      <div className="flex items-center gap-1">
        <div className="relative hidden sm:block">
          <button onClick={() => setTplOpen((o) => !o)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-ink-soft hover:bg-ink/[0.06] hover:text-ink">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6l7-3 7 3-7 3zM3 6v8l7 3 7-3V6M10 9v8" strokeLinejoin="round" /></svg>
            Templates
          </button>
          {tplOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setTplOpen(false)} />
              <div className="absolute right-0 z-20 mt-1 w-60 overflow-hidden rounded-xl border border-line bg-paper py-1 shadow-[var(--shadow-float)]">
                {TEMPLATES.map((t) => (
                  <button key={t.id} onClick={() => { loadTemplate(t.id); setTplOpen(false) }} className="block w-full px-3 py-2 text-left hover:bg-ink/[0.04]">
                    <span className="block text-sm font-semibold text-ink">{t.label}</span>
                    <span className="block text-xs text-ink-faint">{t.blurb}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <span className="mx-1 hidden h-6 w-px bg-line sm:block" />
        <IconButton active={showGrid} onClick={toggleGrid} label="Grid">
          <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h14M3 13h14M8 3v14M13 3v14" /></svg>
        </IconButton>
        <IconButton active={snap} onClick={toggleSnap} label="Snap">
          <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 4v6a4 4 0 008 0V4M6 4H4m2 0h2m6 0h2m-2 0h-2" strokeLinecap="round" /></svg>
        </IconButton>
        <IconButton onClick={() => exportPNG()} label="Export PNG">
          <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3v9m0 0l-3-3m3 3l3-3M4 15v2h12v-2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </IconButton>
        <div className="relative">
          <IconButton onClick={share} label="Share link">
            <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="10" r="2" /><circle cx="14" cy="5" r="2" /><circle cx="14" cy="15" r="2" /><path d="M8 9l4-3M8 11l4 3" /></svg>
          </IconButton>
          {copied && <span className="absolute right-0 top-11 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-xs text-paper">Link copied</span>}
        </div>
        <IconButton onClick={() => { if (window.confirm('Clear the plan and start from an empty room?')) reset() }} label="Reset">
          <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 8A6 6 0 104 9M15 8V4m0 4h-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </IconButton>

        <button onClick={onOpenPanels} className={buttonClass('subtle', 'sm', 'lg:hidden')}>Details</button>
        <Link to="/" className={buttonClass('outline', 'sm', 'ml-1 hidden sm:inline-flex')}>Exit</Link>
      </div>
    </header>
  )
}
