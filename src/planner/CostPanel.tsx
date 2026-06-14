import { useMemo } from 'react'
import { computeCost, formatUSD } from '../model/pricing'
import { usePlanner } from '../store/store'
import { buttonClass } from '../lib/ui'

function Row({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-baseline justify-between py-1 text-sm">
      <span className="text-ink-soft">{label}{sub && <span className="text-ink-faint"> · {sub}</span>}</span>
      <span className="font-medium tabular-nums text-ink">{value}</span>
    </div>
  )
}

export function CostPanel({ onQuote }: { onQuote: () => void }) {
  const plan = usePlanner((s) => s.plan)
  const cost = useMemo(() => computeCost(plan), [plan])
  return (
    <div className="border-b border-line p-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">Budget estimate</p>
          <p className="font-display text-3xl font-semibold tabular-nums text-ink">{formatUSD(cost.total)}</p>
        </div>
        <span className="mb-1 text-xs text-ink-faint">{cost.finishedSqft} sq ft</span>
      </div>
      <div className="mt-2 border-t border-line-soft pt-2">
        {cost.rooms > 0 && <Row label={`Rooms (${cost.roomCount})`} value={formatUSD(cost.rooms)} />}
        {cost.finishes.total > 0 && <Row label="Floor & ceiling" sub={cost.finishes.label} value={formatUSD(cost.finishes.total)} />}
        {cost.features > 0 && <Row label={`Features (${cost.featureCount})`} value={formatUSD(cost.features)} />}
      </div>
      <button onClick={onQuote} className={buttonClass('primary', 'md', 'mt-3 w-full')}>Send my plan to John</button>
      <p className="mt-1.5 text-center text-[11px] text-ink-faint">Ballpark only — John confirms the real number.</p>
    </div>
  )
}
