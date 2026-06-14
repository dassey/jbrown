import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { PlanCanvas2D } from './PlanCanvas2D'
import { Toolbar } from './Toolbar'
import { Library } from './Library'
import { CostPanel } from './CostPanel'
import { ValidationPanel } from './ValidationPanel'
import { PropertiesPanel } from './PropertiesPanel'
import { ScopePanel } from './ScopePanel'
import { SubmitModal } from './SubmitModal'
import { validate } from '../model/validation'
import { decodePlan } from '../lib/share'
import { usePlanner } from '../store/store'
import { cn } from '../lib/ui'

const PlanScene3D = lazy(() => import('./PlanScene3D'))

function Loading3D() {
  return (
    <div className="grid h-full w-full place-items-center" style={{ background: 'radial-gradient(120% 120% at 50% 10%, #2a2620, #100e0a)' }}>
      <div className="flex flex-col items-center gap-3 text-paper/70">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-paper/20 border-t-brass" />
        <span className="text-sm">Rendering your basement…</span>
      </div>
    </div>
  )
}

type RightTab = 'check' | 'design' | 'scope'

function RightRail() {
  const selectedId = usePlanner((s) => s.selectedId)
  const [tab, setTab] = useState<RightTab>('check')
  useEffect(() => {
    if (selectedId) setTab('design')
  }, [selectedId])
  const [quote, setQuote] = useState(false)
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <CostPanel onQuote={() => setQuote(true)} />
      <div className="flex border-b border-line">
        {(['check', 'design', 'scope'] as RightTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn('flex-1 py-2.5 text-[13px] font-semibold transition-colors', tab === t ? 'border-b-2 border-brass text-ink' : 'text-ink-faint hover:text-ink')}
          >
            {t === 'check' ? 'Code check' : t === 'design' ? 'Style' : 'Scope'}
          </button>
        ))}
      </div>
      {tab === 'check' ? <ValidationPanel /> : tab === 'design' ? <PropertiesPanel /> : <ScopePanel />}
      {quote && <SubmitModal onClose={() => setQuote(false)} />}
    </div>
  )
}

export function Planner() {
  const plan = usePlanner((s) => s.plan)
  const view = usePlanner((s) => s.view)
  const loadPlan = usePlanner((s) => s.loadPlan)
  const issues = useMemo(() => validate(plan), [plan])

  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)

  // Load a shared plan from the URL (?d=...), then strip it to the working copy.
  useEffect(() => {
    const h = window.location.hash
    const qi = h.indexOf('?')
    if (qi >= 0) {
      const d = new URLSearchParams(h.slice(qi + 1)).get('d')
      if (d) {
        const p = decodePlan(d)
        if (p) loadPlan(p)
        window.history.replaceState(null, '', `${location.pathname}#/plan`)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keyboard shortcuts.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return
      const s = usePlanner.getState()
      if (!s.selectedId) {
        if (e.key === 'Escape') s.select(null)
        return
      }
      if (e.key === 'Delete' || e.key === 'Backspace') { s.removeItem(s.selectedId); e.preventDefault() }
      else if (e.key === 'r' || e.key === 'R') s.rotateItem(s.selectedId)
      else if (e.key === 'Escape') s.select(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-bone">
      <Toolbar onOpenLibrary={() => setLeftOpen(true)} onOpenPanels={() => setRightOpen(true)} />

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-64 shrink-0 border-r border-line bg-bone lg:block">
          <Library />
        </aside>

        <main className="relative min-w-0 flex-1">
          {view === '2d' ? <PlanCanvas2D issues={issues} /> : <Suspense fallback={<Loading3D />}><PlanScene3D /></Suspense>}
        </main>

        <aside className="hidden w-80 shrink-0 border-l border-line bg-bone lg:flex">
          <RightRail />
        </aside>
      </div>

      {/* Mobile: library drawer */}
      <Drawer side="left" open={leftOpen} onClose={() => setLeftOpen(false)}>
        <Library onAdded={() => setLeftOpen(false)} />
      </Drawer>
      {/* Mobile: details drawer */}
      <Drawer side="right" open={rightOpen} onClose={() => setRightOpen(false)} wide>
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <span className="font-display font-semibold text-ink">Details</span>
          <button onClick={() => setRightOpen(false)} className="text-sm text-ink-soft">Close</button>
        </div>
        <RightRail />
      </Drawer>
    </div>
  )
}

function Drawer({ side, open, onClose, wide, children }: { side: 'left' | 'right'; open: boolean; onClose: () => void; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={cn('fixed inset-0 z-50 lg:hidden', open ? '' : 'pointer-events-none')}>
      <div className={cn('absolute inset-0 bg-ink/40 transition-opacity', open ? 'opacity-100' : 'opacity-0')} onClick={onClose} />
      <div
        className={cn(
          'absolute top-0 flex h-full flex-col bg-bone shadow-2xl transition-transform duration-300',
          side === 'left' ? 'left-0 border-r' : 'right-0 border-l',
          wide ? 'w-[min(22rem,90vw)]' : 'w-[min(18rem,85vw)]',
          'border-line',
          open ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full',
        )}
      >
        {children}
      </div>
    </div>
  )
}
