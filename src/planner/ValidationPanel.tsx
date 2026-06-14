import { useMemo } from 'react'
import { issueCounts, validate } from '../model/validation'
import type { Issue } from '../model/types'
import { usePlanner } from '../store/store'
import { cn } from '../lib/ui'

const SEV = {
  error: { dot: 'bg-flag', border: 'border-l-flag', text: 'text-flag', label: 'Fix' },
  warning: { dot: 'bg-amber', border: 'border-l-amber', text: 'text-amber', label: 'Review' },
  ok: { dot: 'bg-sage', border: 'border-l-sage', text: 'text-sage-deep', label: 'OK' },
} as const

function IssueCard({ issue, onClick }: { issue: Issue; onClick: () => void }) {
  const s = SEV[issue.severity]
  return (
    <button
      onClick={onClick}
      className={cn('block w-full rounded-lg border border-line border-l-4 bg-paper px-3 py-2.5 text-left transition-colors hover:bg-ink/[0.03]', s.border)}
    >
      <p className="text-[13px] font-semibold leading-snug text-ink">{issue.title}</p>
      <p className="mt-0.5 text-[12px] leading-snug text-ink-soft">{issue.detail}</p>
      {issue.fix && (
        <p className={cn('mt-1 flex items-start gap-1 text-[12px] font-medium leading-snug', s.text)}>
          <svg viewBox="0 0 16 16" className="mt-0.5 h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 13l4-4M9 3l4 4-6 6-4 1 1-4z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {issue.fix}
        </p>
      )}
    </button>
  )
}

export function ValidationPanel() {
  const plan = usePlanner((s) => s.plan)
  const select = usePlanner((s) => s.select)
  const issues = useMemo(() => validate(plan), [plan])
  const counts = issueCounts(issues)
  const problems = issues.filter((i) => i.severity !== 'ok')
  const passing = issues.filter((i) => i.severity === 'ok')

  return (
    <div className="fp-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-line bg-bone/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-semibold text-ink">Code check</h2>
          <div className="flex items-center gap-2 text-xs font-semibold">
            {counts.errors > 0 && <span className="flex items-center gap-1 text-flag"><span className="h-2 w-2 rounded-full bg-flag" />{counts.errors}</span>}
            {counts.warnings > 0 && <span className="flex items-center gap-1 text-amber"><span className="h-2 w-2 rounded-full bg-amber" />{counts.warnings}</span>}
            {counts.errors === 0 && counts.warnings === 0 && <span className="flex items-center gap-1 text-sage-deep"><span className="h-2 w-2 rounded-full bg-sage" />Clear</span>}
          </div>
        </div>
        <p className="mt-0.5 text-xs text-ink-faint">Live against basement building-code rules.</p>
      </div>

      <div className="space-y-2 p-3">
        {problems.length === 0 && (
          <div className="rounded-xl border border-sage/30 bg-sage/[0.06] px-4 py-6 text-center">
            <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-sage/15 text-sage-deep">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <p className="mt-2 text-sm font-semibold text-ink">No issues found</p>
            <p className="text-xs text-ink-soft">Your layout meets the guidelines we check.</p>
          </div>
        )}
        {problems.map((i) => (
          <IssueCard key={i.id} issue={i} onClick={() => i.itemIds?.[0] && select(i.itemIds[0])} />
        ))}

        {passing.length > 0 && (
          <div className="pt-1">
            <p className="mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">Passing ({passing.length})</p>
            <div className="space-y-1">
              {passing.map((i) => (
                <div key={i.id} className="flex items-start gap-2 px-1 py-1 text-[12px] text-ink-soft">
                  <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8.5l3 3 7-7.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span><span className="font-medium text-ink">{i.title}.</span> {i.detail}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
