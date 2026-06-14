export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

export function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type Variant = 'primary' | 'dark' | 'outline' | 'ghost' | 'subtle'
type Size = 'sm' | 'md' | 'lg'

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', extra = ''): string {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass/50 disabled:opacity-50 disabled:cursor-not-allowed select-none'
  const sizes: Record<Size, string> = {
    sm: 'text-[13px] px-3.5 py-2',
    md: 'text-[15px] px-5 py-2.5',
    lg: 'text-base px-7 py-3.5',
  }
  const variants: Record<Variant, string> = {
    primary: 'bg-brass text-ink hover:bg-brass-bright shadow-[0_8px_22px_-10px_rgba(168,130,63,0.8)] hover:-translate-y-0.5',
    dark: 'bg-ink text-paper hover:bg-graphite-soft hover:-translate-y-0.5',
    outline: 'border border-ink/20 text-ink hover:border-ink/45 hover:bg-ink/[0.04]',
    ghost: 'text-ink/75 hover:text-ink hover:bg-ink/[0.06]',
    subtle: 'bg-ink/[0.06] text-ink hover:bg-ink/[0.1]',
  }
  return cn(base, sizes[size], variants[variant], extra)
}
