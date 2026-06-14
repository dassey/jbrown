import { CEILING_TYPES, FLOOR_FINISHES, TRIM_COLORS, WALL_COLORS, getElement } from '../model/catalog'
import { inchesToFeet } from '../model/geometry'
import { usePlanner, selectedItem } from '../store/store'
import { cn } from '../lib/ui'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line px-4 py-4 last:border-0">
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">{title}</p>
      {children}
    </div>
  )
}
function Stepper({ value, set, step = 12, min, max, unit }: { value: number; set: (n: number) => void; step?: number; min: number; max: number; unit?: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-paper">
      <button onClick={() => set(Math.max(min, value - step))} className="grid h-8 w-8 place-items-center text-ink hover:bg-ink/[0.05]">−</button>
      <span className="min-w-[4rem] text-center text-sm font-semibold tabular-nums text-ink">{inchesToFeet(value)}{unit}</span>
      <button onClick={() => set(Math.min(max, value + step))} className="grid h-8 w-8 place-items-center text-ink hover:bg-ink/[0.05]">+</button>
    </div>
  )
}
function Pills({ value, options, onChange }: { value: number; options: number[]; onChange: (n: number) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)} className={cn('rounded-full border px-2.5 py-1.5 text-xs font-medium tabular-nums', value === o ? 'border-brass bg-brass/15 text-ink' : 'border-line text-ink-soft hover:border-ink/30')}>{inchesToFeet(o)}</button>
      ))}
    </div>
  )
}
function Swatch({ color, active, onClick }: { color: string; active: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={cn('h-8 w-8 rounded-full ring-1 ring-ink/15 transition-transform hover:scale-110', active && 'ring-2 ring-brass ring-offset-2 ring-offset-bone')} style={{ backgroundColor: color }} aria-label="swatch" />
}

function ItemEditor() {
  const item = usePlanner(selectedItem)!
  const def = getElement(item.defId)!
  const updateItem = usePlanner((s) => s.updateItem)
  const rotateItem = usePlanner((s) => s.rotateItem)
  const removeItem = usePlanner((s) => s.removeItem)
  const duplicateItem = usePlanner((s) => s.duplicateItem)
  const isZone = def.class === 'zone'
  const sqft = Math.round((item.width * item.depth) / 144)

  return (
    <div className="fp-scroll flex-1 overflow-y-auto">
      <Section title="Selected">
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-ink">{def.label}</span>
          {isZone && <span className="font-mono text-xs text-ink-faint">{sqft} sq ft</span>}
        </div>
      </Section>

      {def.widths && def.widths.length > 1 && (
        <Section title={isZone ? 'Width' : 'Size'}>
          <Pills value={item.width} options={def.widths} onChange={(w) => updateItem(item.id, { width: w })} />
        </Section>
      )}
      {isZone && def.depths && def.depths.length > 1 && (
        <Section title="Depth">
          <Pills value={item.depth} options={def.depths} onChange={(d) => updateItem(item.id, { depth: d })} />
        </Section>
      )}

      <Section title="Arrange">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => rotateItem(item.id)} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-sm font-medium text-ink hover:border-ink/30">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M15 8a6 6 0 10.5 4M15 3v5h-5" strokeLinecap="round" strokeLinejoin="round" /></svg>Rotate
          </button>
          <button onClick={() => duplicateItem(item.id)} className="rounded-full border border-line px-3.5 py-2 text-sm font-medium text-ink hover:border-ink/30">Duplicate</button>
          <button onClick={() => removeItem(item.id)} className="rounded-full px-3.5 py-2 text-sm font-medium text-flag hover:bg-flag/10">Remove</button>
        </div>
      </Section>
    </div>
  )
}

function StyleEditor() {
  const plan = usePlanner((s) => s.plan)
  const setPalette = usePlanner((s) => s.setPalette)
  const setRoom = usePlanner((s) => s.setRoom)
  const setProjectName = usePlanner((s) => s.setProjectName)
  const p = plan.palette
  return (
    <div className="fp-scroll flex-1 overflow-y-auto">
      <Section title="Project">
        <input value={plan.project.name} onChange={(e) => setProjectName(e.target.value)} className="w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm font-medium text-ink focus:border-brass focus:outline-none" />
      </Section>

      <Section title="Flooring">
        <div className="space-y-1.5">
          {FLOOR_FINISHES.map((f) => (
            <button key={f.id} onClick={() => setPalette({ floor: f.id })} className={cn('flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-1.5 text-left', p.floor === f.id ? 'border-brass bg-brass/[0.07]' : 'border-line hover:border-ink/25')}>
              <span className="h-6 w-6 rounded-md ring-1 ring-ink/10" style={{ backgroundColor: f.color }} />
              <span className="flex-1 text-sm font-medium text-ink">{f.label}</span>
              <span className="font-mono text-[11px] text-ink-faint">+${f.pricePerSqft}/ft²</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Wall color">
        <div className="flex flex-wrap gap-2">{WALL_COLORS.map((c) => <Swatch key={c} color={c} active={p.wall === c} onClick={() => setPalette({ wall: c })} />)}</div>
      </Section>

      <Section title="Ceiling">
        <div className="space-y-1.5">
          {CEILING_TYPES.map((c) => (
            <button key={c.id} onClick={() => setPalette({ ceiling: c.id })} className={cn('flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-1.5 text-left', p.ceiling === c.id ? 'border-brass bg-brass/[0.07]' : 'border-line hover:border-ink/25')}>
              <span className="h-6 w-6 rounded-md ring-1 ring-ink/10" style={{ backgroundColor: c.color }} />
              <span className="flex-1 text-sm font-medium text-ink">{c.label}</span>
              <span className="font-mono text-[11px] text-ink-faint">+${c.pricePerSqft}/ft²</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Trim">
        <div className="flex flex-wrap gap-2">{TRIM_COLORS.map((c) => <Swatch key={c} color={c} active={p.trim === c} onClick={() => setPalette({ trim: c })} />)}</div>
      </Section>

      <Section title="Basement size">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between"><span className="text-sm text-ink-soft">Width</span><Stepper value={plan.room.width} set={(n) => setRoom({ width: n })} min={120} max={720} /></div>
          <div className="flex items-center justify-between"><span className="text-sm text-ink-soft">Depth</span><Stepper value={plan.room.depth} set={(n) => setRoom({ depth: n })} min={120} max={720} /></div>
          <div className="flex items-center justify-between"><span className="text-sm text-ink-soft">Ceiling</span><Stepper value={plan.room.height} set={(n) => setRoom({ height: n })} step={2} min={78} max={120} /></div>
        </div>
      </Section>
    </div>
  )
}

export function PropertiesPanel() {
  const hasSelection = usePlanner((s) => s.selectedId !== null)
  return hasSelection ? <ItemEditor /> : <StyleEditor />
}
