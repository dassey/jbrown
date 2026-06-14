import { useMemo } from 'react'
import { computeCost, formatUSD } from '../model/pricing'
import { usePlanner } from '../store/store'
import { BUSINESS } from '../config/business'
import { buttonClass } from '../lib/ui'

/** Placeholder hand-off — no order/email processing in this prototype. */
export function SubmitModal({ onClose }: { onClose: () => void }) {
  const plan = usePlanner((s) => s.plan)
  const cost = useMemo(() => computeCost(plan), [plan])
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/55 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-line bg-paper shadow-[var(--shadow-lift)]">
        <div className="bg-graphite px-6 py-8 text-center text-paper">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-paper/10">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5h16v14H4zM4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <h2 className="mt-4 font-display text-2xl font-semibold">Here is where we’d send your plan to John for a design consultation.</h2>
        </div>
        <div className="px-6 py-6 text-center">
          <p className="text-sm leading-relaxed text-ink-soft">
            This is a front-end prototype — nothing was sent. On the real site this would email your layout, dimensions and
            ballpark to {BUSINESS.owner} to start your basement design ({BUSINESS.email}).
          </p>
          <div className="mt-5 rounded-2xl bg-bone px-4 py-3">
            <div className="text-xs uppercase tracking-wider text-ink-faint">Your basement, roughly</div>
            <div className="font-display text-3xl font-semibold tabular-nums text-ink">{formatUSD(cost.total)}</div>
            <div className="text-xs text-ink-faint">{cost.finishedSqft} finished sq ft</div>
          </div>
          <button onClick={onClose} className={buttonClass('dark', 'md', 'mt-6 w-full')}>Back to my plan</button>
        </div>
      </div>
    </div>
  )
}
