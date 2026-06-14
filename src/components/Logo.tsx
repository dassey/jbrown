import { cn } from '../lib/ui'

/** Basement Designer mark: a house with its lower (basement) level lit up. */
export function Logo({ className, showWordmark = true, size = 'md' }: { className?: string; showWordmark?: boolean; size?: 'sm' | 'md' | 'lg' }) {
  const mark = { sm: 'h-7 w-7', md: 'h-9 w-9', lg: 'h-11 w-11' }[size]
  const text = { sm: 'text-[15px]', md: 'text-lg', lg: 'text-2xl' }[size]
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 40 40" className={cn(mark, 'shrink-0')} fill="none" aria-hidden="true">
        <rect x="2.5" y="2.5" width="35" height="35" rx="8" stroke="currentColor" strokeWidth="2.3" />
        {/* house above grade */}
        <path d="M11 21l9-7 9 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 21v-1M27 21v-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* basement level (accent) */}
        <rect x="11" y="21" width="18" height="9" rx="1.5" fill="#c1762e" opacity="0.18" />
        <rect x="11" y="21" width="18" height="9" rx="1.5" stroke="#c1762e" strokeWidth="2" />
        <path d="M16 30v-9M24 30v-9" stroke="#c1762e" strokeWidth="1.4" />
      </svg>
      {showWordmark && (
        <span className={cn('font-display font-semibold leading-none tracking-tight', text)}>
          Basement <span className="text-brass">Designer</span>
        </span>
      )}
    </span>
  )
}
