import { getElement } from '../model/catalog'
import { formatUSD } from '../model/pricing'
import { SCOPE_GROUPS, SCOPE_GROUP_LABEL, SCOPE_ITEMS } from '../model/scope'
import type { ScopeItem } from '../model/types'
import { usePlanner } from '../store/store'
import { cn } from '../lib/ui'

function unitLabel(item: ScopeItem): string {
  switch (item.unit) {
    case 'each': return `${formatUSD(item.price)} each`
    case 'sqft': return `${formatUSD(item.price)}/sq ft`
    case 'linft': return `${formatUSD(item.price)}/ft`
    default: return formatUSD(item.price)
  }
}

export function ScopePanel() {
  const plan = usePlanner((s) => s.plan)
  const setScope = usePlanner((s) => s.setScope)
  const scope = plan.scope ?? {}

  const sqft = plan.items.reduce((n, it) => {
    const d = getElement(it.defId)
    return d?.class === 'zone' ? n + (it.width * it.depth) / 144 : n
  }, 0)
  const perimeterFt = (2 * (plan.room.width + plan.room.depth)) / 12

  function contribution(item: ScopeItem, qty: number): number {
    if (qty <= 0) return 0
    if (item.unit === 'each') return item.price * qty
    if (item.unit === 'sqft') return item.price * sqft
    if (item.unit === 'linft') return item.price * perimeterFt
    return item.price
  }

  return (
    <div className="fp-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-line bg-bone/95 px-4 py-3 backdrop-blur">
        <h2 className="font-display text-base font-semibold text-ink">Scope &amp; systems</h2>
        <p className="mt-0.5 text-xs text-ink-faint">Electrical, waterproofing, repair &amp; air — added to your estimate.</p>
      </div>

      <div className="space-y-5 p-3">
        {SCOPE_GROUPS.map((g) => (
          <div key={g}>
            <p className="mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">{SCOPE_GROUP_LABEL[g]}</p>
            <div className="space-y-2">
              {SCOPE_ITEMS.filter((s) => s.group === g).map((item) => {
                const qty = scope[item.id] ?? 0
                const on = qty > 0
                const amt = Math.round(contribution(item, qty))
                return (
                  <div key={item.id} className={cn('rounded-xl border bg-paper p-3 transition-colors', on ? 'border-brass/60' : 'border-line')}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-ink">{item.label}</p>
                        <p className="mt-0.5 text-[12px] leading-snug text-ink-soft">{item.blurb}</p>
                      </div>
                      {item.mode === 'toggle' ? (
                        <button
                          role="switch"
                          aria-checked={on}
                          onClick={() => setScope(item.id, on ? 0 : 1)}
                          className="mt-0.5 shrink-0"
                        >
                          <span className={cn('relative block h-6 w-10 rounded-full transition-colors', on ? 'bg-sage' : 'bg-ink/20')}>
                            <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-paper shadow transition-all', on ? 'left-[1.125rem]' : 'left-0.5')} />
                          </span>
                        </button>
                      ) : (
                        <div className="inline-flex shrink-0 items-center rounded-full border border-line bg-paper">
                          <button onClick={() => setScope(item.id, Math.max(0, qty - (item.step ?? 1)))} className="grid h-7 w-7 place-items-center text-ink hover:bg-ink/[0.05]">−</button>
                          <span className="min-w-[1.75rem] text-center text-sm font-semibold tabular-nums text-ink">{qty}</span>
                          <button onClick={() => setScope(item.id, Math.min(item.max ?? 99, qty + (item.step ?? 1)))} className="grid h-7 w-7 place-items-center text-ink hover:bg-ink/[0.05]">+</button>
                        </div>
                      )}
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[11px]">
                      <span className="font-mono text-ink-faint">{unitLabel(item)}</span>
                      {on && <span className="font-semibold tabular-nums text-brass-deep">{formatUSD(amt)}</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
