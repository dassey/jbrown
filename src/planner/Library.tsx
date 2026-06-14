import { CATEGORY_LABEL, ELEMENTS } from '../model/catalog'
import type { ElementCategory } from '../model/types'
import { formatUSD } from '../model/pricing'
import { usePlanner } from '../store/store'
import { ElementIcon } from './icons'

const CATS: ElementCategory[] = ['rooms', 'features', 'fixtures', 'systems']

export function Library({ onAdded }: { onAdded?: () => void }) {
  const addElement = usePlanner((s) => s.addElement)
  return (
    <div className="fp-scroll flex h-full flex-col overflow-y-auto">
      <div className="border-b border-line px-4 py-3">
        <h2 className="font-display text-base font-semibold text-ink">Add to your basement</h2>
        <p className="mt-0.5 text-xs text-ink-faint">Tap to drop one in, then drag it into place.</p>
      </div>
      <div className="px-3 py-3">
        {CATS.map((cat) => (
          <div key={cat} className="mb-4 last:mb-0">
            <p className="mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">{CATEGORY_LABEL[cat]}</p>
            <div className="grid grid-cols-2 gap-2">
              {ELEMENTS.filter((e) => e.category === cat).map((e) => (
                <button
                  key={e.id}
                  onClick={() => { addElement(e.id); onAdded?.() }}
                  className="group flex items-center gap-2.5 rounded-xl border border-line bg-paper px-2.5 py-2 text-left transition-all hover:border-ink/30 hover:shadow-[var(--shadow-panel)]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink/[0.05] text-ink-soft group-hover:bg-brass/15 group-hover:text-brass-deep">
                    <ElementIcon name={e.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-semibold text-ink">{e.label}</span>
                    <span className="block text-[11px] text-ink-faint">
                      {e.priceUnit === 'sqft' ? `${formatUSD(e.price)}/sq ft` : e.price > 0 ? formatUSD(e.price) : '—'}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
