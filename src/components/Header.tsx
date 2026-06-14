import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Logo } from './Logo'
import { buttonClass, cn, scrollToId } from '../lib/ui'

const NAV = [
  { label: '2D & 3D designer', id: 'designer' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'Awards', id: 'awards' },
  { label: 'About John', id: 'about' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  function go(id: string) {
    setOpen(false)
    if (location.pathname === '/') scrollToId(id)
    else { navigate('/'); setTimeout(() => scrollToId(id), 80) }
  }
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bone/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-ink" onClick={() => setOpen(false)}><Logo /></Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => go(n.id)} className="rounded-full px-3.5 py-2 text-[15px] font-medium text-ink-soft transition-colors hover:bg-ink/[0.05] hover:text-ink">
              {n.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/plan" className={buttonClass('dark', 'sm', 'hidden sm:inline-flex')}>Design your basement</Link>
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-ink/[0.06] lg:hidden">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">{open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}</svg>
          </button>
        </div>
      </div>
      <div className={cn('overflow-hidden border-t border-line bg-bone lg:hidden', open ? 'max-h-96' : 'max-h-0')} style={{ transition: 'max-height 280ms ease' }}>
        <div className="space-y-1 px-4 py-4">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => go(n.id)} className="block w-full rounded-xl px-3 py-2.5 text-left font-medium text-ink-soft hover:bg-ink/[0.05]">{n.label}</button>
          ))}
          <Link to="/plan" onClick={() => setOpen(false)} className={buttonClass('primary', 'md', 'mt-2 w-full')}>Design your basement</Link>
        </div>
      </div>
    </header>
  )
}
